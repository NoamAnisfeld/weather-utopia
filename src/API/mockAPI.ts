const CACHED_API_RESULTS_URL = '/cached-api-results.json';

// Yeah JSON returns 'any', that's not just a lazy TypeScript
const deepJSONCopy = (obj: any): any => JSON.parse(JSON.stringify(obj));

const mockApiPromise: Promise<any> = new Promise(async resolve => {
        const cachedAPIResults = await fetch(CACHED_API_RESULTS_URL);
        resolve(await cachedAPIResults.json());
    });

async function getFromMockApi(key: string) {
    return (await mockApiPromise)[key] || undefined;
}

export async function getAutocompleteList(str: string) {
    const fullList = await getFromMockApi('autocomplete');

    if (Object.hasOwn(fullList, str)) {
        return deepJSONCopy(fullList[str]);
    } else {
        return [];
    }
}

export async function getCurrentConditionsEntry(cityKey: string) {
    const fullList = await getFromMockApi('currentconditions');

    if (Object.hasOwn(fullList, cityKey)) {
        const data = fullList[cityKey]?.[0];
        return deepJSONCopy(data);
    } else {
        return null;
    }
}