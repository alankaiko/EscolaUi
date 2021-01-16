import { Turno } from './../../core/model';
import { TurnoFiltro, TurnoService } from './../../zservice/turno.service';
import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-turno',
  templateUrl: './lista-turno.component.html',
  styleUrls: ['./lista-turno.component.css'],
  providers: [ MessageService , ConfirmationService]
})
export class ListaTurnoComponent implements OnInit {
  turnos: [];
  totalRegistros = 0;
  visible = true;
  filtro = new TurnoFiltro();

  constructor(private service: TurnoService,
              private route: Router,
              private confirmation: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {}


  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.turnos = response.turnos.content;
      }).catch(erro => console.log(erro));
  }

  ConfirmarExclusao(turno: Turno) {
    this.confirmation.confirm({
      message: 'Deseja Excluir: ' + turno.turno,
      accept: () => {
        this.Excluir(turno);
      }
    });
  }

  Excluir(turno: Turno) {
    this.service.Remover(turno.codigo)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Turno excluído com sucesso!' });
      }).catch(erro => erro);

    this.visible = false;
    setTimeout (() => this.visible = true, 50);
  }


  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }

}
