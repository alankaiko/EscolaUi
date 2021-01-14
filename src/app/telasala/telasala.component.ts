import { FormControl } from '@angular/forms';
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
    this.RodandoScript();
  }

  RodandoScript() {
    setInterval(() => {
      this.datahoje = new Date();
      this.filtro.dataregistro = this.datahoje;

      if(this.filtro.sala !== "" && this.filtro.sala !== null && this.filtro.sala !== undefined){
        this.Consultar();
      }

    }, 3000);
  }

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro).then(response => {
      this.totalRegistros = response.total;
      this.registros = response.registros.content;
    }).catch(erro => console.log(erro));
  }

  Salvar(form: FormControl) {}
}
