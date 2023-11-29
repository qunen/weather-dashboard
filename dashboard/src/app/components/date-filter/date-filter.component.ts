import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { ButtonComponent } from '../button/button.component';

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
  selector: 'app-date-filter',
  standalone: true,
  imports: [
    CommonModule, 
    NativeDateModule, 
    MatDatepickerModule, 
    MatFormFieldModule, 
    ButtonComponent,
  ],
  templateUrl: './date-filter.component.html',
  styleUrl: './date-filter.component.css',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: CUSTON_DATE_FORMAT }
  ]
})
export class DateFilterComponent {
  buttonText: string = 'Filter';
  startDate: string = ''; 
  endDate: string = '';
  onDateChange(startDate: HTMLInputElement, endDate: HTMLInputElement) {
    this.startDate = startDate.value;
    this.endDate = endDate.value;
  }
  @Output() pickedDateRange = new EventEmitter();
  onClick() {
    this.pickedDateRange.emit({ startDate: this.startDate, endDate: this.endDate });
  }
}
