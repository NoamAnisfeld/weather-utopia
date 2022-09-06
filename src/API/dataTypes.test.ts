import { NOT_AVAILABLE, CityCurrentConditions } from "./dataTypes";
import { validateCityCurrentConditions } from "./dataTypes";

test('Valid city current conditions', () => {
    const data: CityCurrentConditions = {
            WeatherText: "Perfect",
            Temperature: {
                Metric: {
                    Value: 23
                }
            }
        };
    
    const validatedData = validateCityCurrentConditions(data);

    expect(validatedData).toStrictEqual(data);
});

test('Invalid city current conditions', () => {
    const data = {
            WeatherText: [],
            Temperature: {
                Metric: {
                    Value: "ABC"
                }
            }
        };
    
    const validatedData = validateCityCurrentConditions(data);

    expect(validatedData).toStrictEqual({
        WeatherText: NOT_AVAILABLE,
        Temperature: {
            Metric: {
                Value: NOT_AVAILABLE
            }            
        }
    });
});

test('Partially valid city current conditions', () => {
    const data = {
            WeatherText: "Snowy",
            Temperature: 34
        };
    
    const validatedData = validateCityCurrentConditions(data);

    expect(validatedData).toStrictEqual({
        WeatherText: data.WeatherText,
        Temperature: {
            Metric: {
                Value: NOT_AVAILABLE
            }            
        }
    });
});