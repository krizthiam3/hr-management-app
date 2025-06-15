import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from '../models/department.model';
import { Observable } from 'rxjs';
import { Position } from '../models/position.model';

@Injectable({ providedIn: 'root' })
export class PositionService {
  private apiUrl = 'https://localhost:5001/api/positions';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Position[]> {
    return this.http.get<Position[]>(this.apiUrl);
  }

  getById(id: number): Observable<Position> {
    return this.http.get<Position>(`${this.apiUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
