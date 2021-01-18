import { CartaoService } from './../zservice/cartao.service';
import { Cartao, RegistroMovimentacao } from './../core/model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import onScan from 'onscan.js/onscan.js';
import { RegistromovimentacaoService } from '../zservice/registromovimentacao.service';

@Component({
  selector: 'app-chamada',
  templateUrl: './chamada.component.html',
  styleUrls: ['./chamada.component.css']
})
export class ChamadaComponent implements OnInit {
  // cartao = new Cartao();
  registro = new RegistroMovimentacao();

  constructor(private service: CartaoService,
              private serviceregistro: RegistromovimentacaoService) { }

  ngOnInit() {
    this.Escanear();
  }

  Escanear() {
    try {
      onScan.attachTo(document, {
        onScan: function(sCode) {
          const contentDiv = document.getElementById('cartaoid') as HTMLInputElement;
          contentDiv.value = sCode;
          contentDiv.focus();
          contentDiv.blur();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  public PesquisarPorCodigoCartao() {
    this.registro = new RegistroMovimentacao();
    const contentDiv = document.getElementById('cartaoid') as HTMLInputElement;
    this.service.BuscarPorCodBarras(contentDiv.value).then(cartao => {
      this.registro.cartao = cartao;

      if (this.registro.cartao !== null && this.registro.cartao !== undefined) {
        const today = new Date();
        this.registro.dataregistro = today;
        this.registro.horaregistro =  today.getHours() + ':' + ('00' + today.getMinutes()).slice(-2) + ':' + today.getSeconds();
        this.serviceregistro.Adicionar(this.registro).then(response => this.registro = response);
      }

      setTimeout(() => {
        this.BuscarImagem();
      }, 200);
    });

    setTimeout(() => {
      this.registro = new RegistroMovimentacao();
      contentDiv.value = '';
    }, 5000);
  }

  Salvar() {}

  BuscarImagem() {
    this.serviceregistro.PegarImagemString(this.registro.cartao.aluno.imagem.codigo).subscribe(data => {
      this.registro.cartao.aluno.imagem.imagem = data;
    }, error => {
      console.log(error);
    });
  }
}
