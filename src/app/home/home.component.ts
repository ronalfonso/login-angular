import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TEST_USER_EMAIL } from '../../shared/constants';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public form: FormGroup;
  public firstSearch: boolean = true;
  public bookings: Array<any> = [];
  public searchTerm: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private home: HomeService) {
    this.initForm();
  }

  ngOnInit() {

  }

  initForm() {
    this.form = this.formBuilder.group({
      email: new FormControl(TEST_USER_EMAIL, Validators.required),
      current: new FormControl(true)
    });
  }

  searchBookings() {
    this.home.getBookings(this.form.value.email, this.form.value.current)
      .subscribe((response: Array<any>) => {
        this.firstSearch = false;
        this.bookings = response;
      }, err => {
        console.log(err);
      });
  }

  setFilteredItems() {
    this.bookings = this.home.filterBookings(this.searchTerm);
  }

}