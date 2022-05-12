import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
  }

  goToEmployeeList() {
    this.router.navigate(["/employees"]);
  }

  saveEmployee() {
    this.employeeService.createEmployee(this.employee)
      .subscribe((data) => {
        console.log(data)
        this.goToEmployeeList();
      })
  }

  onSubmit() {
    this.saveEmployee();
  }

}
