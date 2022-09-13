import type { ApiEndpoints } from "./apiInterface";

const CACHED_API_RESULTS_URL = `${process.env.PUBLIC_URL}/cached-api-results.json`;

const deepJSONClone = (obj: any): any => JSON.parse(JSON.stringify(obj));

const mockApiPromise: Promise<any> = new Promise(async resolve => {
        const cachedAPIResults = await fetch(CACHED_API_RESULTS_URL);
        resolve(await cachedAPIResults.json());
    });

async function getFromMockApi(key: string) {
    return (await mockApiPromise)[key] || undefined;
}

const mockApi: ApiEndpoints = {

    async getAutocompleteList(str: string) {
        const fullAutoCompleteList = await getFromMockApi('autocomplete');
    
        if (Object.hasOwn(fullAutoCompleteList, str)) {
            return deepJSONClone(fullAutoCompleteList[str]);
        } else {
            return [];
        }
    },
    
    async getCurrentConditionsEntry(cityKey: string) {
        const fullConditionsList = await getFromMockApi('currentconditions');
    
        if (Object.hasOwn(fullConditionsList, cityKey)) {
            const data = fullConditionsList[cityKey]?.[0];
            return deepJSONClone(data);
        } else {
            return null;
        }
    }
}

export const {
    getAutocompleteList,
    getCurrentConditionsEntry
}: ApiEndpoints = mockApi;