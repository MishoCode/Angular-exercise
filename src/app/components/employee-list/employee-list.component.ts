import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[];

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
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
      //this.employees.sort((e1, e2) => e1.firstName.localeCompare(e2.firstName));
    });
  }

  updateEmployee(id: number) {
    this.router.navigate(["update-employee", id]);
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe((data) => {
        console.log(data);
        this.getEmployees();
      })
  }

}
