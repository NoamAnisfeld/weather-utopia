import { useEffect, useState, useRef, useMemo } from "react";
import type { City } from "../API/autocomplete";
import autocomplete from '../API/autocomplete';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormSelect from 'react-bootstrap/FormSelect';

function useCitiesToOptionList({
    cities,
    currentCityKey,
    currentInputText,
}: {
    cities: City[],
    currentCityKey: string,
    currentInputText: string,
}) {
    return useMemo(() => cities.map(city =>
        <option
            value={city.apiKey}
            key={city.apiKey}
        >
            {city.name}
        </option>), [
            cities, currentCityKey, currentInputText
        ]
    );
}

export default function CitySearchBox({
    cityName,
    setCityName,
    cityKey,
    setCityKey,
}: {
    cityName: string,
    setCityName: (cityName: string) => void,
    cityKey: string,
    setCityKey: (cityKey: string) => void,
}) {
    const [inputText, setInputText] = useState(cityName),
        [citiesList, setCitiesList] = useState<City[]>([]),
        [autoFocusTextInput, setAutoFocusTextInput] = useState(true);

    const selectElementRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        inputText &&
        (inputText !== cityName || !citiesList.length) &&
            (async () => {
                const newCitiesList = await autocomplete(inputText);
                setCitiesList(newCitiesList);
            })();
    }, [inputText, cityName, citiesList]);

    const isFirstTime = useRef(true);
    useEffect(() => {
        // On app init, try to fetch data even without the user
        // actively selecting an entry from the list
        if (isFirstTime.current && citiesList.length) {
            isFirstTime.current = false;
            
            const findCityKey =
                citiesList.find(city => city.name === cityName)?.apiKey;
            if (findCityKey) {
                setCityKey(findCityKey);
            }
        }
    }, [citiesList, cityName, setCityKey]);
    
    return <Container className="city-search">
        <Form.Label className="w-100">
            <span className="fs-5 fw-bold">
                City:
            </span>
            <Form.Control
                autoFocus={autoFocusTextInput}
                type="text"
                placeholder="start typing to search"
                value={inputText}
                onChange={e => setInputText(e.currentTarget.value)}
                onBlur={autoFocusTextInput ?
                    () => setAutoFocusTextInput(false) :
                    undefined
                }
                onKeyUp={e =>
                    (e.key === 'ArrowDown') && selectElementRef.current?.focus()
                }
            />
        </Form.Label>
        <FormSelect
            ref={selectElementRef}
            autoFocus={!autoFocusTextInput}
            htmlSize={5}
            value={cityKey}
            onChange={e => {
                const newCityKey = e.currentTarget.value,
                    newCityName = citiesList.find(item => item.apiKey === newCityKey)?.name;

                setCityKey(newCityKey);
                setCityName(newCityName || 'city name is missing');
                if (newCityName) {
                    setInputText(newCityName)
                };
            }}
        >
            {useCitiesToOptionList({
                cities: citiesList,
                currentCityKey: cityKey,
                currentInputText: inputText,
            })}
        </FormSelect>
    </Container>
}