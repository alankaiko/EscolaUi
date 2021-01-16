import { ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/api';
import { ResppedagogicoFiltro, ResppedagogicoService } from './../../zservice/resppedagogico.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Resppedagogico } from 'src/app/core/model';

@Component({
  selector: 'app-lista-resppegadogico',
  templateUrl: './lista-resppegadogico.component.html',
  styleUrls: ['./lista-resppegadogico.component.css'],
  providers: [ MessageService , ConfirmationService]
})
export class ListaResppegadogicoComponent implements OnInit {
  responsaveis: [];
  totalRegistros = 0;
  visible = true;
  filtro = new ResppedagogicoFiltro();

  constructor(private service: ResppedagogicoService,
              private route: Router,
              private confirmation: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {}


  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.responsaveis = response.responsaveis.content;
      }).catch(erro => console.log(erro));
  }

  ConfirmarExclusao(resp: Resppedagogico) {
    this.confirmation.confirm({
      message: 'Deseja Excluir: ' + resp.professor,
      accept: () => {
        this.Excluir(resp);
      }
    });
  }

  Excluir(resp: Resppedagogico) {
    this.service.Remover(resp.codigo)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Professor excluído com sucesso!' });
      }).catch(erro => erro);

    this.visible = false;
    setTimeout (() => this.visible = true, 50);
  }


  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }

}
