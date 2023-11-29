import { ChartOptions, ChartConfiguration } from "chart.js";

export interface LineChartProps {
    chartTitle: string;
    lineChartOptions: ChartOptions<'line'>;
    lineChartData: ChartConfiguration<'line'>['data'];
}
