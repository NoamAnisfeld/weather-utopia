import { getAutocompleteList } from "./api";

export interface City {
    name: string,
    key: string,
    country: string,
}

function processApiCityEntry(entry: any): City {
    return {
        name: entry?.LocalizedName || '',
        key: entry?.Key || '',
        country: entry?.Country?.LocalizedName || '',
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

// When there's no full prefix match, this function tries partial prefix.
// For example, "TelAviv" would still bring "Tel Aviv" because there's a
// partial prefix match
async function partialPrefixApiAutocomplete(str: string): Promise<any[]> {
    const list = await rawApiAutocomplete(str);

    if (!list.length && str.length > 1) {
        return partialPrefixApiAutocomplete(str.slice(0, -1));
    } else {
        return list;
    }
}

export default async function autocomplete(str: string): Promise<City[]> {
    const rawList = await partialPrefixApiAutocomplete(str);

    return rawList.map(processApiCityEntry);
}