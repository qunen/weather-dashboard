export interface RelativeHumidityResponse {
    success: boolean;
    data: RelativeHumidityData;
};

export interface RelativeHumidityData {
    time: string[];
    relativeHumidity: number[];
};
