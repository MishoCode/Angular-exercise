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

  employees: any;
  totalElements: number;
  size: number;
  page: number = 0;

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
    this.employeeService.getEmployees(this.page).subscribe((response: any) => {
      this.employees = response.content;
      this.size = response.size;
      this.totalElements = response.totalElements;
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

  pageChangeEvent(event: number) {
    this.page = event;
    this.getEmployees();
}

}
