const CACHED_API_RESULTS_URL = '/cached-api-results.json';

// Yeah JSON returns 'any', that's not just a lazy TypeScript
const deepJSONCopy = (obj: any): any => JSON.parse(JSON.stringify(obj));

let results: any;
let resolveResultsAvailable: (value: unknown) => void = () => {};
const resultsAvailable: Promise<any> = new Promise(resolve => {
    resolveResultsAvailable = resolve;
});

(async function() {
    const cachedAPIResults = await fetch(CACHED_API_RESULTS_URL);
    results = await cachedAPIResults.json();
    resolveResultsAvailable(results);
})();

export async function getResult(key: string) {
    if (results) {
        return deepJSONCopy(results[key] || '');
    } else {
        const results = await resultsAvailable;
        return deepJSONCopy(results[key] || '');
    }
}

export async function getAutocompleteList(str: string) {
    const fullList = await getResult('autocomplete');

    if (Object.hasOwn(fullList, str)) {
        return deepJSONCopy(fullList[str]);
    } else {
        return [];
    }
}