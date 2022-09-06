import type { CityCurrentConditions } from "../API/dataTypes";

export default function CityInfoWidget({
    name,
    info,
}: {
    name: string,
    info: CityCurrentConditions,
}) {
    const { 
        WeatherText: conditionsText,
        Temperature: {
            Metric: {
                Value: temperature
            }
        }
    } = info;

    return <>
        <h2>{name}</h2>
        <dl>
            <dt>Weather:</dt>
            <dd>{conditionsText}</dd>

            <dt>Temperature:</dt>
            <dd>{`${temperature}°C`}</dd>
        </dl>
    </>
}