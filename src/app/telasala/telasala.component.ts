import { LazyLoadEvent } from 'primeng/api';
import { RegistroMovimentacaoFiltro, RegistromovimentacaoService } from './../zservice/registromovimentacao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-telasala',
  templateUrl: './telasala.component.html',
  styleUrls: ['./telasala.component.css']
})
export class TelasalaComponent implements OnInit {
  registros: [];
  totalRegistros = 0;
  visible = true;
  filtro = new RegistroMovimentacaoFiltro();
  datahoje: Date;

  constructor(private service: RegistromovimentacaoService) { }

  ngOnInit() {
    this.datahoje = new Date();
    this.filtro.dataregistro = this.datahoje;
    this.filtro.sala = 'sala';
  }

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro).then(response => {
      this.totalRegistros = response.total;
      this.registros = response.registros.content;
    }).catch(erro => console.log(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }

}
