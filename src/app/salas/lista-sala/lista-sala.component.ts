import { Sala } from './../../core/model';
import { SalaFiltro, SalaService } from './../../zservice/sala.service';
import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-sala',
  templateUrl: './lista-sala.component.html',
  styleUrls: ['./lista-sala.component.css'],
  providers: [ MessageService , ConfirmationService]
})
export class ListaSalaComponent implements OnInit {
  salas: [];
  totalRegistros = 0;
  visible = true;
  filtro = new SalaFiltro();

  constructor(private service: SalaService,
              private route: Router,
              private confirmation: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {}


  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.salas = response.salas.content;
      }).catch(erro => console.log(erro));
  }

  ConfirmarExclusao(sala: Sala) {
    this.confirmation.confirm({
      message: 'Deseja Excluir: ' + sala.sala,
      accept: () => {
        this.Excluir(sala);
      }
    });
  }

  Excluir(sala: Sala) {
    this.service.Remover(sala.codigo)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Sala excluída com sucesso!' });
      }).catch(erro => erro);

    this.visible = false;
    setTimeout (() => this.visible = true, 50);
  }


  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }

}
