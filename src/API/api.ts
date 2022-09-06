const API_BASE_URL = 'http://dataservice.accuweather.com',
    AUTOCOMPLETE_API_ENDPOINT = '/locations/v1/cities/autocomplete', // ?apikey=${apiKey}&q={string}
    CURRENT_CONDITIONS_API_ENDPOINT = '/currentconditions/v1/', // /${cityKey}?apikey=${apiKey}
    API_KEY = 'YiCPwUg4nMNEaUFenv2Bv2CyWk8dOjhh';
    

export async function getAutocompleteList(str: string) {
    return await (await fetch(
        `${API_BASE_URL}${AUTOCOMPLETE_API_ENDPOINT}?apikey=${API_KEY}&q=${encodeURIComponent(str)}`
    )).json();
}

export async function getCurrentConditionsEntry(cityKey: string) {
    return (await (await fetch(
        `${API_BASE_URL}${CURRENT_CONDITIONS_API_ENDPOINT}/${cityKey}?apikey=${API_KEY}`
    )).json())?.[0];
}