import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit {
  Books: any = [];

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.crudService.GetBooks().subscribe((res) => {
      console.log(res);
      this.Books = res;
    });
  }

  delete(id: any, i: any) {
    // console.log(id);
    // if (window.confirm('Are you sure?')) {
    //   this.crudService.DeleteBook(id).subscribe((res) => {
    //     this.Books.splice(i, 1);
    //   });
    // }
    Swal.fire({
      title: 'คุณแน่ใจไหม?',
      text: 'ลบแล้วไม่สามารถย้อนกลับได้',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่ ลบเลย',
      cancelButtonText: 'ไม่ ขอคิดดูก่อน',
    }).then((result) => {
      if (result.value) {
        this.crudService.DeleteBook(id).subscribe((res) => {
          this.Books.splice(i, 1);
        });
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }
}
