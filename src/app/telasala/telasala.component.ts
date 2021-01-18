import { RegistroMovimentacao } from './../core/model';
import { FormControl } from '@angular/forms';
import { RegistroMovimentacaoFiltro, RegistromovimentacaoService } from './../zservice/registromovimentacao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-telasala',
  templateUrl: './telasala.component.html',
  styleUrls: ['./telasala.component.css']
})
export class TelasalaComponent implements OnInit {
  registros: Array<RegistroMovimentacao>;
  registro = new RegistroMovimentacao();
  totalRegistros = 0;
  visible = true;
  filtro = new RegistroMovimentacaoFiltro();
  datahoje: Date;

  constructor(private service: RegistromovimentacaoService) { }

  ngOnInit() {
    this.datahoje = new Date();
    this.filtro.dataregistro = this.datahoje;

    this.RodandoScript();
  }

  RodandoScript() {
    setInterval(() => {
      if(this.filtro.sala !== "" && this.filtro.sala !== null && this.filtro.sala !== undefined){
        this.Consultar();
      }
    }, 5000);
  }

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro).then(response => {
      this.totalRegistros = response.total;
      this.registros = response.registros.content;

      this.ConferirUltimoRegistro();
    }).catch(erro => console.log(erro));
  }

  Salvar() {}

  ConferirUltimoRegistro() {
    if ((this.registro?.codigo === undefined) || (this.registro?.codigo !== this.registros[this.registros.length - 1]?.codigo)) {
      this.registro = this.registros[this.registros.length - 1];

      if (this.registro?.cartao?.aluno?.imagem?.codigo !== undefined) {
        this.BuscarImagem();
      }
    }
  }

  BuscarImagem() {
    this.service.PegarImagemString(this.registro?.cartao?.aluno?.imagem?.codigo).subscribe(data => {
      this.registro.cartao.aluno.imagem.imagem = data;
    }, error => {
      console.log(error);
    });
  }
}
