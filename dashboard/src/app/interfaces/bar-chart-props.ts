import { ChartOptions, ChartConfiguration } from "chart.js";

export interface BarChartProps {
    chartTitle: string;
    barChartOptions: ChartOptions<'bar'>;
    barChartData: ChartConfiguration<'bar'>['data'];
}
