import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RelativeHumidityResponse } from '../interfaces/relative-humidity';

@Injectable({
  providedIn: 'root'
})
export class RelativeHumidityService {
  private apiUrl: string = `http://localhost:8080/api/v1/relativeHumidity`;

  constructor(private http: HttpClient) { };

  getRelativeHumidityData(startDate: string = '', endDate: string = ''): Observable<RelativeHumidityResponse> {
    const query: string[] = [];
    if (startDate && startDate.trim()) query.push(`startDate=${startDate}`);
    if (endDate && endDate.trim()) query.push(`endDate=${endDate}`);
    return this.http.get<RelativeHumidityResponse>(`${this.apiUrl}/?${query.join('&')}`);
  };
}
