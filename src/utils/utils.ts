export function safeJSONParse(input: string, valueIfInvalid: any) {
    try {
        return JSON.parse(input);
    } catch {
        return valueIfInvalid;
    }
}