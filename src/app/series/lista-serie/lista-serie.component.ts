import { SerieFiltro, SerieService } from './../../zservice/serie.service';
import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Serie } from 'src/app/core/model';

@Component({
  selector: 'app-lista-serie',
  templateUrl: './lista-serie.component.html',
  styleUrls: ['./lista-serie.component.css'],
  providers: [ MessageService , ConfirmationService]
})
export class ListaSerieComponent implements OnInit {
  series: [];
  totalRegistros = 0;
  visible = true;
  filtro = new SerieFiltro();

  constructor(private service: SerieService,
              private route: Router,
              private confirmation: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {}


  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.series = response.series.content;
      }).catch(erro => console.log(erro));
  }

  ConfirmarExclusao(serie: Serie) {
    this.confirmation.confirm({
      message: 'Deseja Excluir: ' + serie.serie,
      accept: () => {
        this.Excluir(serie);
      }
    });
  }

  Excluir(serie: Serie) {
    this.service.Remover(serie.codigo)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Série excluído com sucesso!' });
      }).catch(erro => erro);

    this.visible = false;
    setTimeout (() => this.visible = true, 50);
  }


  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }

}
