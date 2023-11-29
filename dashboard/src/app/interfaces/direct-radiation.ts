export interface DirectRadiationResponse {
    success: boolean;
    data: DirectRadiationData;
};

export interface DirectRadiationData {
    time: string[];
    directRadiation: number[];
};
