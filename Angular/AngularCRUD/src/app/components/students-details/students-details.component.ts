import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Students } from 'src/app/models/students.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentsDetailsComponent implements OnInit {

  currentStudent: Students = {
    DepartmentId:'',
    DepartmentName:'',
    Published:''
  };
  message = '';

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getTutorial(this.route.snapshot.params.id);
  }

  getTutorial(id: string): void {
    this.studentService.get(id)
      .subscribe(
        data => {
          this.currentStudent = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status: boolean): void {
    const data = {
      DepartmentId: this.currentStudent.DepartmentId,
      DepartmentName: this.currentStudent.DepartmentName,
      published:''
    };

    this.message = '';

    this.studentService.update(this.currentStudent.DepartmentId, data)
      .subscribe(
        response => {
          this.currentStudent.Published = status;
          console.log(response);
          this.message = response.message ? response.message : 'The status was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  updateTutorial(): void {
    this.message = '';

    this.studentService.update(this.currentStudent.DepartmentId, this.currentStudent)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This tutorial was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteTutorial(): void {
    this.studentService.delete(this.currentStudent.DepartmentId)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/students']);
        },
        error => {
          console.log(error);
        });
  }
}
