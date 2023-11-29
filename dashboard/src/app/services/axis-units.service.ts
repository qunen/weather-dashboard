import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AxisUnitsResponse } from '../interfaces/axis-units';

@Injectable({
  providedIn: 'root'
})
export class AxisUnitsService {
  private apiUrl: string = `http://localhost:8080/api/v1/axisUnits`;

  constructor(private http: HttpClient) { };

  getAxisUnitsData(): Observable<AxisUnitsResponse> {
    return this.http.get<AxisUnitsResponse>(this.apiUrl);
  }
}
