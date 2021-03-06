import { TelasalaComponent } from './telasala/telasala.component';
import { LoginComponent } from './login/login.component';
import { ChamadaComponent } from './chamada/chamada.component';
import { ListaResppegadogicoComponent } from './responsavel/lista-resppegadogico/lista-resppegadogico.component';
import { CadResppegadogicoComponent } from './responsavel/cad-resppegadogico/cad-resppegadogico.component';
import { InicioComponent } from './inicio/inicio/inicio.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaSalaComponent } from './salas/lista-sala/lista-sala.component';
import { CadSalaComponent } from './salas/cad-sala/cad-sala.component';
import { ListaTurnoComponent } from './turnos/lista-turno/lista-turno.component';
import { ListaTurmaComponent } from './turmas/lista-turma/lista-turma.component';
import { CadTurmaComponent } from './turmas/cad-turma/cad-turma.component';
import { ListaSerieComponent } from './series/lista-serie/lista-serie.component';
import { CadSerieComponent } from './series/cad-serie/cad-serie.component';
import { ListaCartaoComponent } from './cartoes/lista-cartao/lista-cartao.component';
import { CadCartaoComponent } from './cartoes/cad-cartao/cad-cartao.component';
import { ListaAlunoComponent } from './alunos/lista-aluno/lista-aluno.component';
import { CadAlunoComponent } from './alunos/cad-aluno/cad-aluno.component';
import { CadTurnoComponent } from './turnos/cad-turno/cad-turno.component';

const routes: Routes = [
  { path: '', component: InicioComponent },

  { path: 'alunos/novo', component: CadAlunoComponent },
  { path: 'alunos/:cod', component: CadAlunoComponent },
  { path: 'alunos', component: ListaAlunoComponent },

  { path: 'cartoes/novo', component: CadCartaoComponent },
  { path: 'cartoes/:cod', component: CadCartaoComponent },
  { path: 'cartoes', component: ListaCartaoComponent },

  { path: 'responsaveis/novo', component: CadResppegadogicoComponent },
  { path: 'responsaveis/:cod', component: CadResppegadogicoComponent },
  { path: 'responsaveis', component: ListaResppegadogicoComponent },

  { path: 'series/novo', component: CadSerieComponent },
  { path: 'series/:cod', component: CadSerieComponent },
  { path: 'series', component: ListaSerieComponent },

  { path: 'turmas/novo', component: CadTurmaComponent },
  { path: 'turmas/:cod', component: CadTurmaComponent },
  { path: 'turmas', component: ListaTurmaComponent },

  { path: 'turnos/novo', component: CadTurnoComponent },
  { path: 'turnos/:cod', component: CadTurnoComponent },
  { path: 'turnos', component: ListaTurnoComponent },

  { path: 'salas/novo', component: CadSalaComponent },
  { path: 'salas/:cod', component: CadSalaComponent },
  { path: 'salas', component: ListaSalaComponent },

  { path: 'chamada', component: ChamadaComponent },

  { path: 'login', component: LoginComponent },

  { path: 'telasala', component: TelasalaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
