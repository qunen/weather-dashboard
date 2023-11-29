import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

// Components
import { DateFilterComponent } from '../date-filter/date-filter.component';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { BarChartComponent } from '../bar-chart/bar-chart.component';

// Services
import { AxisUnitsService } from '../../services/axis-units.service';
import { DirectRadiationDataService } from '../../services/direct-radiation-data.service';
import { RelativeHumidityService } from '../../services/relative-humidity.service';
import { TemperatureService } from '../../services/temperature.service';

// Interfaces
import { LineChartProps } from '../../interfaces/line-chart-props';
import { BarChartProps } from '../../interfaces/bar-chart-props';
import { DirectRadiationData } from '../../interfaces/direct-radiation';
import { RelativeHumidityData } from '../../interfaces/relative-humidity';
import { TemperatureData } from '../../interfaces/temperature';

const CUSTON_DATE_FORMAT = {
  parse: {
    dateInput: ['YYYY-MM-DD']
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    NativeDateModule, 
    MatDatepickerModule, 
    MatFormFieldModule, 
    DateFilterComponent,
    LineChartComponent,
    BarChartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: CUSTON_DATE_FORMAT }
  ]
})

export class DashboardComponent implements OnInit {
  constructor(
    private axisUnitsService: AxisUnitsService, 
    private directRadiationService: DirectRadiationDataService,
    private relativeHumidityService: RelativeHumidityService,
    private temperatureService: TemperatureService
  ) {}
  ngOnInit(): void {
    this.axisUnitsService.getAxisUnitsData().subscribe((res) => {
      const directRadiationScales = {
        x: {
          title: {
            display: true,
            text: res.data.directRadiation.x
          }
        },
        y: {
          title: {
            display: true,
            text: res.data.directRadiation.y
          }
        }
      };
      const relativeHumidityScales = {
        x: {
          title: {
            display: true,
            text: res.data.relativeHumidity.x
          }
        },
        y: {
          title: {
            display: true,
            text: res.data.relativeHumidity.y
          }
        }
      };
      const temperatureScales = {
        x: {
          title: {
            display: true,
            text: res.data.temperature.x
          }
        },
        y: {
          title: {
            display: true,
            text: res.data.temperature.y
          }
        }
      };
      this.directRadiationProps.lineChartOptions = { ...this.directRadiationProps.lineChartOptions, scales: directRadiationScales };
      this.relativeHumidityProps.barChartOptions = { ...this.relativeHumidityProps.barChartOptions, scales: relativeHumidityScales };
      this.temperatureProps.lineChartOptions = { ...this.temperatureProps.lineChartOptions, scales: temperatureScales };
    });
    this.directRadiationService.getDirectRadiationData().subscribe((res) => this.updateDirectRadiationData(res.data));
    this.relativeHumidityService.getRelativeHumidityData().subscribe((res) => this.updateRelativeHumidityData(res.data));
    this.temperatureService.getTemperatureData().subscribe((res) => this.updateTemperatureData(res.data));
  }

  // Functions
  updateDirectRadiationData(data: DirectRadiationData): void {
    this.directRadiationProps.lineChartData = { ...this.directRadiationProps.lineChartData, labels: data.time.map((timestamp) => timestamp.slice(0,16)) };
    this.directRadiationProps.lineChartData.datasets[0] = { ...this.directRadiationProps.lineChartData.datasets[0], data: data.directRadiation };
  }
  updateRelativeHumidityData(data: RelativeHumidityData): void {
    this.relativeHumidityProps.barChartData = { ...this.relativeHumidityProps.barChartData, labels: data.time.map((timestamp) => timestamp.slice(0,16)) };
    this.relativeHumidityProps.barChartData.datasets[0] = { ...this.relativeHumidityProps.barChartData.datasets[0], data: data.relativeHumidity };
    console.log(this.relativeHumidityProps)
  }
  updateTemperatureData(data: TemperatureData): void {
    this.temperatureProps.lineChartData = { ...this.temperatureProps.lineChartData, labels: data.date.map((timestamp) => timestamp.slice(0,10)) };
    this.temperatureProps.lineChartData.datasets[0] = { ...this.temperatureProps.lineChartData.datasets[0], data: data.max };
    this.temperatureProps.lineChartData.datasets[1] = { ...this.temperatureProps.lineChartData.datasets[1], data: data.min };
  }
  filterCharts(dateObject: { startDate: string; endDate: string }) {
    this.directRadiationService.getDirectRadiationData(`${dateObject.startDate}T08:00Z`, `${dateObject.endDate}T08:00Z`).subscribe((res) => this.updateDirectRadiationData(res.data));
    this.relativeHumidityService.getRelativeHumidityData(`${dateObject.startDate}T08:00Z`, `${dateObject.endDate}T08:00Z`).subscribe((res) => this.updateRelativeHumidityData(res.data));
    this.temperatureService.getTemperatureData(`${dateObject.startDate}T08:00Z`, `${dateObject.endDate}T08:00Z`).subscribe((res) => this.updateTemperatureData(res.data));
  }

  // Direct Radiation Chart
  directRadiationProps: LineChartProps = {
    chartTitle: 'Hourly Direct Radiation',
    lineChartOptions: {
      responsive: true,
      scales: {}
    },
    lineChartData: {
      labels: [],
      datasets: [
        {
          data: [],
          label: 'Direct Radiation',
          fill: 'origin',
          tension: 0,
          backgroundColor: 'rgba(0,122,204,0.2)',
          borderColor: 'rgba(0,122,204,1)',
          pointBackgroundColor: 'rgba(0,122,204,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(0,122,204,1)',
        }
      ]
    }
  };

  // Relative Humidity Chart
  relativeHumidityProps: BarChartProps = {
    chartTitle: 'Hourly Relative Humidity',
    barChartOptions: {
      responsive: true,
      scales: {}
    },
    barChartData: {
      labels: [],
      datasets: [
        {
          data: [],
          label: 'Relative Humidity',
          backgroundColor: 'rgba(0,122,204,0.3)',
          hoverBackgroundColor: 'rgba(255,120,88,0.3)'
        }
      ]
    }
  }

  // Temperature Chart 
  temperatureProps: LineChartProps = {
    chartTitle: 'Daily Temperature',
    lineChartOptions: {
      responsive: true,
      scales: {}
    },
    lineChartData: {
      labels: [],
      datasets: [
        {
          data: [],
          label: 'Max',
          tension: 0,
          borderColor: 'rgba(255,120,88,1)',
          pointBackgroundColor: 'rgba(255,120,88,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,120,88,1)',
        },
        {
          data: [],
          label: 'min',
          tension: 0,
          borderColor: 'rgba(0,122,204,1)',
          pointBackgroundColor: 'rgba(0,122,204,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(0,122,204,1)',
        }
      ]
    }
  }; 
}
