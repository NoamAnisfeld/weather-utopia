import { NOT_AVAILABLE } from "./dataTypes"
import { getAutocompleteList } from "./mockAPI"

interface City {
    name: string,
    country: string,
    apiKey: string,
}

function processApiCityEntry(entry: any): City {
    return {
        name: entry?.LocalizedName || NOT_AVAILABLE,
        country: entry?.Country?.LocalizedName || NOT_AVAILABLE,
        apiKey: entry?.Key || ''
    }
}

async function rawApiAutocomplete(str: string): Promise<any[]> {
    const list = await getAutocompleteList(str);

    if (!Array.isArray(list)) {
        console.warn('Unexpected result from autocomplete API, expected an array');
        return [];
    }
    return list;
}

async function recursiveRawApiAutocomplete(str: string): Promise<any[]> {
    const list = await rawApiAutocomplete(str);

    if (!list.length && str.length > 1) {
        return recursiveRawApiAutocomplete(str.substring(0, -1));
    } else {
        return list;
    }
}

export default async function autocomplete(str: string): Promise<City[]> {
    const rawList = await recursiveRawApiAutocomplete(str);

    return rawList.map(processApiCityEntry);
}