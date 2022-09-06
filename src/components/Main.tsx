import CitySearchBox from './CitySearchBox';
import CityInfoWidget from './CityInfoWidget';

export default function Main({
    cityName,
    setCityName,
    cityKey,
    setCityKey,
}:{
    cityName: string,
    setCityName: (cityName: string) => void,
    cityKey: string,
    setCityKey: (cityKey: string) => void,
} ) {

    return <>
        <CitySearchBox {...{
            cityName,
            setCityName,
            setCityKey,
        }} />
        <CityInfoWidget {...{
            cityName,
            cityKey,
        }}/>
    </>
}