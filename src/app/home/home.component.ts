import { Component, OnInit } from '@angular/core';

import { HomeService } from './../shared/home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private HomeService: HomeService) { }

  ngOnInit(): void {
    this.HomeService.getMovie().subscribe(action=> console.log(action))
  }

}
