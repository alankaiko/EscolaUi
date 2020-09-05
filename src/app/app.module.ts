import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListaTurnoComponent } from './turnos/lista-turno/lista-turno.component';
import { ListaCartaoComponent } from './cartoes/lista-cartao/lista-cartao.component';
import { CadCartaoComponent } from './cartoes/cad-cartao/cad-cartao.component';
import { ListaResppedagogicoComponent } from './responsavel/lista-resppedagogico/lista-resppedagogico.component';
import { CadResppedagogicoComponent } from './responsavel/cad-resppedagogico/cad-resppedagogico.component';
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
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    CadAlunoComponent,
    ListaAlunoComponent,
    CadCartaoComponent,
    ListaCartaoComponent,
    CadResppedagogicoComponent,
    ListaResppedagogicoComponent,
    CadSerieComponent,
    ListaSerieComponent,
    CadTurmaComponent,
    ListaTurmaComponent,
    CadTurnoComponent,
    ListaTurnoComponent,
    CadSalaComponent,
    ListaSalaComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
