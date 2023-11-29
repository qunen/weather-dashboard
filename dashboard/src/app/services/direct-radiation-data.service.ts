import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DirectRadiationResponse } from '../interfaces/direct-radiation';

@Injectable({
  providedIn: 'root'
})
export class DirectRadiationDataService {
  private apiUrl: string = `http://localhost:3000/api/v1/directRadiation`;

  constructor(private http: HttpClient) { };

  getDirectRadiationData(startDate: string = '', endDate: string = ''): Observable<DirectRadiationResponse> {
    const query: string[] = [];
    if (startDate && startDate.trim()) query.push(`startDate=${startDate}`);
    if (endDate && endDate.trim()) query.push(`endDate=${endDate}`);
    return this.http.get<DirectRadiationResponse>(`${this.apiUrl}/?${query.join('&')}`);
  };
}
