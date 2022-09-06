const NOT_AVAILABLE = 'not available';

// matches selected fields of the API
interface CityCurrentConditions {
    WeatherText: string | typeof NOT_AVAILABLE,
    Temperature: {
        Metric: {
            Value: number
        }
    } | typeof NOT_AVAILABLE
}

function validateString(input: any): string {
    return typeof input === 'string' ? input : '';
}

function validateNumber(input: any): number {
    return typeof input === 'number' ? input : 0;
}

function validateCityCurrentConditions(input: any): CityCurrentConditions {
    return {
        WeatherText: validateString(input?.WeatherText) || NOT_AVAILABLE,
        Temperature: validateNumber(input?.Temperature?.Metric?.Value) ?
            input.Temperature : NOT_AVAILABLE
    }
}

export type {
    CityCurrentConditions
}

export {
    NOT_AVAILABLE,
    validateCityCurrentConditions
}