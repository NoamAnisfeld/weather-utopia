// import { getCurrentConditionsEntry } from "./mockAPI"
import { getCurrentConditionsEntry } from "./api"

export interface CityConditions {
    weatherText: string,
    temperatureC: number | undefined,
    temperatureF: number | undefined,
}

export default async function cityConditions(cityKey: string): Promise<CityConditions | null> {
    const data = await getCurrentConditionsEntry(cityKey);

    if (!data) {
        return null;
    }
    return {
        weatherText: data?.WeatherText || '',
        temperatureC: Number(data?.Temperature?.Metric?.Value) || undefined,
        temperatureF: Number(data?.Temperature?.Imperial?.Value) || undefined,
    }
}