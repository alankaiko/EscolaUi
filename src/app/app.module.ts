import { BannerComponent } from './core/banner/banner.component';
import { FooterComponent } from './core/footer/footer.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListaTurnoComponent } from './turnos/lista-turno/lista-turno.component';
import { ListaCartaoComponent } from './cartoes/lista-cartao/lista-cartao.component';
import { CadCartaoComponent } from './cartoes/cad-cartao/cad-cartao.component';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ListaSerieComponent } from './series/lista-serie/lista-serie.component';
import { CadSerieComponent } from './series/cad-serie/cad-serie.component';
import { ListaSalaComponent } from './salas/lista-sala/lista-sala.component';
import { CadSalaComponent } from './salas/cad-sala/cad-sala.component';
import { CadAlunoComponent } from './alunos/cad-aluno/cad-aluno.component';
import { ListaAlunoComponent } from './alunos/lista-aluno/lista-aluno.component';
import { CadTurnoComponent } from './turnos/cad-turno/cad-turno.component';
import { ListaTurmaComponent } from './turmas/lista-turma/lista-turma.component';
import { CadTurmaComponent } from './turmas/cad-turma/cad-turma.component';
import { InicioComponent } from './inicio/inicio/inicio.component';
import {WebcamModule} from 'ngx-webcam';
import { AppComponent } from './app.component';
import { DropdownModule } from 'primeng/dropdown';
import { CadResppegadogicoComponent } from './responsavel/cad-resppegadogico/cad-resppegadogico.component';
import { ListaResppegadogicoComponent } from './responsavel/lista-resppegadogico/lista-resppegadogico.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChamadaComponent } from './chamada/chamada.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import { ImagemComponent } from './alunos/imagem/imagem.component';
import { LoginComponent } from './login/login.component';
import { TelasalaComponent } from './telasala/telasala.component';
import {ToastModule} from 'primeng/toast';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TableModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    DropdownModule,
    RadioButtonModule,
    WebcamModule,
    ToastModule
  ],
  declarations: [
    AppComponent,
    CadAlunoComponent,
    ListaAlunoComponent,
    CadCartaoComponent,
    ListaCartaoComponent,
    CadResppegadogicoComponent,
    ListaResppegadogicoComponent,
    CadSerieComponent,
    ListaSerieComponent,
    CadTurmaComponent,
    ListaTurmaComponent,
    CadTurnoComponent,
    ListaTurnoComponent,
    CadSalaComponent,
    ListaSalaComponent,
    InicioComponent,
    CadResppegadogicoComponent,
    ListaResppegadogicoComponent,
    NavbarComponent,
    FooterComponent,
    ChamadaComponent,
    BannerComponent,
    ImagemComponent,
    LoginComponent,
    TelasalaComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
