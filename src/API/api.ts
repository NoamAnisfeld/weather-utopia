import * as mockApi from './mockAPI';

const API_BASE_URL = 'https://dataservice.accuweather.com',
    AUTOCOMPLETE_API_ENDPOINT = '/locations/v1/cities/autocomplete', // ?apikey=${apiKey}&q={string}
    CURRENT_CONDITIONS_API_ENDPOINT = '/currentconditions/v1/', // /${cityKey}?apikey=${apiKey}
    FORECAST_API_ENDPOINT = '/forecasts/v1/daily/5day/', // /${cityKey}?apikey=${apiKey}
    API_KEY = 'YiCPwUg4nMNEaUFenv2Bv2CyWk8dOjhh';
    
const realApi = {
    getAutocompleteList: async function (str: string) {
        return await (await fetch(
            `${API_BASE_URL}${AUTOCOMPLETE_API_ENDPOINT}?apikey=${API_KEY}&q=${encodeURIComponent(str)}`
        )).json();
    },

    getCurrentConditionsEntry: async function (cityKey: string) {
        return (await (await fetch(
            `${API_BASE_URL}${CURRENT_CONDITIONS_API_ENDPOINT}/${cityKey}?apikey=${API_KEY}`
        )).json())?.[0];
    }
}

export const { getAutocompleteList, getCurrentConditionsEntry } =
    process.env.NODE_ENV === 'production' ? realApi : mockApi;