import { MessageComponent } from './message/message.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MessageComponent, NavbarComponent, FooterComponent, BannerComponent],
  exports: [MessageComponent]
})
export class CoreModule { }
