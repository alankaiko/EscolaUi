import { ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/api';
import { CartaoFiltro, CartaoService } from './../../zservice/cartao.service';
import { Cartao } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-cartao',
  templateUrl: './lista-cartao.component.html',
  styleUrls: ['./lista-cartao.component.css'],
  providers: [ MessageService , ConfirmationService]
})
export class ListaCartaoComponent implements OnInit {
  cartoes: [];
  totalRegistros = 0;
  visible = true;
  filtro = new CartaoFiltro();

  constructor(private service: CartaoService,
              private route: Router,
              private confirmation: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {}


  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.cartoes = response.cartoes.content;
      }).catch(erro => console.log(erro));
  }

  ConfirmarExclusao(cartao: Cartao) {
    this.confirmation.confirm({
      message: 'Deseja Excluir: ' + cartao.titulo,
      accept: () => {
        this.Excluir(cartao);
      }
    });
  }

  Excluir(cartao: Cartao) {
    this.service.Remover(cartao.codigo)
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
