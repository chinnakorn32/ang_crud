import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  bookFrom: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.bookFrom = this.formBuilder.group({
      name: [''],
      price: [''],
      description: [''],
    });
  }

  ngOnInit(): void {}

  onSubmit(): any {
    this.crudService.AddBook(this.bookFrom.value).subscribe(
      (res) => {
        console.log('Book added!');
        this.ngZone.run(() => this.router.navigateByUrl('/books-list'));
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
