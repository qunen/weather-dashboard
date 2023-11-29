export interface TemperatureResponse {
    success: boolean;
    data: TemperatureData;
}

export interface TemperatureData {
    date: string[];
    max: number[];
    min: number[];
}
