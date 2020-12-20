import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EscolaUi';

  constructor(private router: Router) {}

  exibindoNavbar() {
    return this.router.url === '/';
  }

  Verifica() {
    return this.router.url === '/chamada';
  }

  VerificaMenu() {
    return this.router.url !== '/chamada';
  }

  Teste() {
    return this.router.url !== '/login';
  }
}
