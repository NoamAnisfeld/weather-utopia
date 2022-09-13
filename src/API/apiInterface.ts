export interface ApiEndpoints {
    getAutocompleteList: (str: string) => Promise<any>,
    getCurrentConditionsEntry: (cityKey: string) => Promise<any>,
}