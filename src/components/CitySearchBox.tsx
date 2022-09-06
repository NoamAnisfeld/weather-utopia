import { useState } from "react";

export default function CitySearchBox() {
    const [cityName, setCityName] = useState('Tel Aviv');

    return <>
        <label>
            City:
            <input
                type="text"
                placeholder="start typing to search"
                value={cityName}
                onChange={e => setCityName(e.currentTarget.value)}
            />
        </label>
        Test: {cityName}
        <select
            onChange={e => setCityName(e.currentTarget.value)}>
            <option value="A">a</option>
            <option value="B">b</option>
            <option value="C">c</option>
        </select>
    </>
}