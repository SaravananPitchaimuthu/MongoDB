import { Component, OnInit } from '@angular/core';
import { Students } from 'src/app/models/students.model';
import { StudentService } from 'src/app/services/students.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './studentss-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  students?: Students[];
  currentStudent: Students = {};
  currentIndex = -1;
  title = '';

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.retrieveStudents();
  }

  retrieveStudents(): void {
    this.studentService.getAll()
      .subscribe(
        data => {
          this.students = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveStudents();
    this.currentStudent = {};
    this.currentIndex = -1;
  }

  setActiveTutorial(student: Students, index: number): void {
    this.currentStudent = student;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.studentService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.currentStudent = {};
    this.currentIndex = -1;

    this.studentService.findByTitle(this.title)
      .subscribe(
        data => {
          this.students = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
