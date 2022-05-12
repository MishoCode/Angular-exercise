import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id: number
  employee: Employee = new Employee();

  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    if(!this.employeeService.selectedEmployee) {
      this.employeeService.getEmployeeById(this.id)
          .subscribe((data) => {this.employee = data;},
            error => console.log(error));
    } else {
      this.employee = {...this.employeeService.selectedEmployee, email: "test@test.com"};
    }
  }

  onSubmit() {
    this.employeeService.updateEmployee(this.id, this.employee)
      .subscribe((data) => {
        console.log(data);
        this.goToEmployeeList();
      }, error => console.log(error));
  }

  goToEmployeeList() {
    this.router.navigate(["/employees"]);
  }

}
