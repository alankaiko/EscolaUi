import { Turma } from './../../core/model';
import { TurmaFiltro, TurmaService } from './../../zservice/turma.service';
import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-turma',
  templateUrl: './lista-turma.component.html',
  styleUrls: ['./lista-turma.component.css'],
  providers: [ MessageService , ConfirmationService]
})
export class ListaTurmaComponent implements OnInit {
  turmas: [];
  totalRegistros = 0;
  visible = true;
  filtro = new TurmaFiltro();

  constructor(private service: TurmaService,
              private route: Router,
              private confirmation: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {}


  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.turmas = response.turmas.content;
      }).catch(erro => console.log(erro));
  }

  ConfirmarExclusao(turma: Turma) {
    this.confirmation.confirm({
      message: 'Deseja Excluir: ' + turma.nome,
      accept: () => {
        this.Excluir(turma);
      }
    });
  }

  Excluir(turma: Turma) {
    this.service.Remover(turma.codigo)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Turma excluída com sucesso!' });
      }).catch(erro => erro);

    this.visible = false;
    setTimeout (() => this.visible = true, 0);
  }


  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }

}
