import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TemperatureResponse } from '../interfaces/temperature';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  private apiUrl: string = `http://localhost:3000/api/v1/temperature`;

  constructor(private http: HttpClient) { }

  getTemperatureData(startDate: string = '', endDate: string = ''): Observable<TemperatureResponse> {
    const query: string[] = [];
    if (startDate && startDate.trim()) query.push(`startDate=${startDate}`);
    if (endDate && endDate.trim()) query.push(`endDate=${endDate}`);
    return this.http.get<TemperatureResponse>(`${this.apiUrl}/?${query.join('&')}`);
  };
}
