import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import {Observable} from 'rxjs';
import {tap, map} from 'rxjs/operators';
import {EmployeeType} from '../../common/constants';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  $employees: Observable<Employee[]>;
  employees: Employee[];

  employeeType: EmployeeType;

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    /*this.employees = [
      {
        "id": 1,
        "firstName": "Pesho",
        "lastName": "Petrov",
        "email": "pepi@gmail.com"
      },
      {
        "id": 2,
        "firstName": "Ivan",
        "lastName": "Ivanov",
        "email": "vanko@gmail.com"
      }
    ]*/

    this.getEmployees();
  }

  private getEmployees() {
    this.employeeService.getEmployees()
      .pipe(map(result => {
        return result.map(emp => ({...emp, isOdd: true}))
      })).subscribe(result => {
        console.log("subscr")
        this.employees = result
    });
  }

  updateEmployee(employee: Employee) {
    this.employeeService.selectedEmployee = employee;
    this.router.navigate(["update-employee", employee.id]);
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe((data) => {
        console.log(data);
        this.getEmployees();
      })
  }

  addEmployee() {
    // this.employees.push({
    //   id: 5,
    //   email: "new_user@user.bg",
    //   firstName: "Alex",
    //   lastName: "Mitev"
    // })
    this.employees[2] = {...this.employees[2], lastName: 'Mitev'}
  }
}
