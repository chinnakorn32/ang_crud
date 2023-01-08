import { Component, NgZone, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  bookFrom: FormGroup;
  alert = false;

  constructor(
    public formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.bookFrom = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get err(): { [key: string]: AbstractControl } {
    return this.bookFrom.controls;
  }

  ngOnInit(): void {}

  onSubmit(): any {
    this.alert = true;
    if (this.bookFrom.invalid) {
      return;
    }
    this.crudService.AddBook(this.bookFrom.value).subscribe(
      (res) => {
        console.log('Book added!');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'เพิ่มข้อมูลเรียบร้อยแล้ว',
          showConfirmButton: false,
          timer: 1500,
        });
        this.ngZone.run(() => this.router.navigateByUrl('/books-list'));
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
