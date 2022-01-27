import { Component, OnInit } from '@angular/core';
import { Students } from 'src/app/models/students.model';
import { StudentService } from 'src/app/services/students.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  student: Students = {
    DepartmentId: '',
    DepartmentName: '',
  };
  submitted = false;

  constructor(private StudentService: StudentService) { }

  ngOnInit(): void {
  }

  saveTutorial(): void {
    const data = {
      title: this.student.DepartmentId,
      description: this.student.DepartmentName
    };

    this.StudentService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newTutorial(): void {
    this.submitted = false;
    this.student = {
      DepartmentId: '',
      DepartmentName: '',
    };
  }
}
