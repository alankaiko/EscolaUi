import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NavbarComponent, FooterComponent, BannerComponent],
  exports: []
})
export class CoreModule { }
