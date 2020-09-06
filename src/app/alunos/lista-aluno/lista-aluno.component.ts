import { AlunosFiltro, AlunoService } from './../../zservice/aluno.service';
import { Aluno } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-aluno',
  templateUrl: './lista-aluno.component.html',
  styleUrls: ['./lista-aluno.component.css'],
  providers: [ MessageService , ConfirmationService]
})
export class ListaAlunoComponent implements OnInit {
  alunos: [];
  totalRegistros = 0;
  visible = true;
  filtro = new AlunosFiltro();

  constructor(private service: AlunoService,
              private route: Router,
              private confirmation: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {}


  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.alunos = response.alunos.content;
      }).catch(erro => console.log(erro));
  }

  ConfirmarExclusao(aluno: Aluno) {
    this.confirmation.confirm({
      message: 'Deseja Excluir: ' + aluno.nome,
      accept: () => {
        this.Excluir(aluno);
      }
    });
  }

  Excluir(aluno: Aluno) {
    this.service.Remover(aluno.codigo)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Aluno excluído com sucesso!' });
      }).catch(erro => erro);

    this.visible = false;
    setTimeout (() => this.visible = true, 0);
  }


  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }

}
