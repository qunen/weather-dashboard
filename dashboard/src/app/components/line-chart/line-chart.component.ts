import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { LineChartProps } from '../../interfaces/line-chart-props';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent {
  @Input() props: LineChartProps = {
    chartTitle: '',
    lineChartOptions: {},
    lineChartData: { labels: [], datasets: [] }
  };
};