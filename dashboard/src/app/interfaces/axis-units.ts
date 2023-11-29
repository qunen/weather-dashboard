export interface AxisUnitsResponse {
    success: boolean;
    data: AxisUnitsData;
}

interface AxisUnitsData {
    directRadiation: AxisUnits;
    relativeHumidity: AxisUnits;
    temperature: AxisUnits;
}

interface AxisUnits {
    x: string;
    y: string;
}