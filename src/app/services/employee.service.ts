import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _selectedEmployee: Employee;
  private apiUrl = `${environment.api}/employees`;

  constructor(private httpClient: HttpClient) { }

  get selectedEmployee(): Employee {
    return this._selectedEmployee;
  }

  set selectedEmployee(value: Employee) {
    this._selectedEmployee = value;
  }

  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.apiUrl);
  }

  createEmployee(employee: Employee) : Observable<Employee> {
    return this.httpClient.post<Employee>(this.apiUrl, employee);
  }

  getEmployeeById(id: number): Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.apiUrl}/${id}`);
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(`${this.apiUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }

}
