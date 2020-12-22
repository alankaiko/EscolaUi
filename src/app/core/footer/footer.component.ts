import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  NaoExibe() {
    return this.router.url !== '/chamada'
      && this.router.url !== '/login'
      && this.router.url !== '/telasala';
  }

}
