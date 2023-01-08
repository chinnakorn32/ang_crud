import { Component, NgZone, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  getID: any;
  updateForm: FormGroup;
  alert = false;

  constructor(
    public fromBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute
  ) {
    this.getID = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudService.GetBook(this.getID).subscribe((res) => {
      this.updateForm.setValue({
        name: res['name'],
        price: res['price'],
        description: res['description'],
      });
    });
    this.updateForm = this.fromBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get err(): { [key: string]: AbstractControl } {
    return this.updateForm.controls;
  }

  ngOnInit(): void {}

  onUpdate(): any {
    this.alert = true;
    if (this.updateForm.invalid) {
      return;
    }
    this.crudService.UpdateBook(this.getID, this.updateForm.value).subscribe(
      (res) => {
        console.log('Book updated!');
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
