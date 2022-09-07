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
        <div className="search-area">
            <CitySearchBox {...{
                cityName,
                setCityName,
                setCityKey,
            }} />
        </div>
        <div className="info-area">
            <CityInfoWidget {...{
                cityName,
                cityKey,
            }}/>
        </div>
    </>
}