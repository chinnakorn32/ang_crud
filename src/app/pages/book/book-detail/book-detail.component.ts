import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  getID: any;
  updateForm: FormGroup;

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
      name: [''],
      price: [''],
      description: [''],
    });
  }

  ngOnInit(): void {}

  onUpdate(): any {
    this.crudService
      .UpdateBook(this.getID, this.updateForm.value)
      .subscribe(
        (res) => {
          console.log('Book updated!');
          this.ngZone.run(() => this.router.navigateByUrl('/books-list'));
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
