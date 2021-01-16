import { ResppedagogicoService } from './../../zservice/resppedagogico.service';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Resppedagogico } from 'src/app/core/model';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-cad-resppegadogico',
  templateUrl: './cad-resppegadogico.component.html',
  styleUrls: ['./cad-resppegadogico.component.css'],
  providers: [ MessageService]
})
export class CadResppegadogicoComponent implements OnInit {
  formulario: FormGroup;
  display: true;

  constructor(private service: ResppedagogicoService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location,
              private messageservice: MessageService) {}

  ngOnInit() {
    this.CriarFormulario(new Resppedagogico());
    const cod = this.rota.snapshot.params.cod;

    if (cod) {
      this.CarregarResps(cod);
    }
  }
  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(resp: Resppedagogico) {
    this.formulario = this.formbuilder.group({
      codigo: [null, resp.codigo],
      professor: [null, resp.professor]
    });
  }

  CarregarResps(codigo: number) {
    this.service.BuscarPorId(codigo).then(resp => this.formulario.patchValue(resp));
  }

  Salvar() {
    if (this.formulario.get('professor').value === '' || this.formulario.get('professor').value === null || this.formulario.get('professor').value === undefined){
      this.FaltaCampo('Professor', 'Informe o Professor');
      return;
    }

    if (this.editando) {
      this.AtualizarResps();
    } else {
      this.formulario.patchValue(this.AdicionarResps());
    }
    this.CriarFormulario(new Resppedagogico());
  }

  AdicionarResps() {
    return this.service.Adicionar(this.formulario.value)
      .then(salvo => {
        this.route.navigate(['/responsaveis']);
      });
  }

  AtualizarResps() {
    this.service.Atualizar(this.formulario.value)
      .then(resp => {
        this.formulario.patchValue(resp);
        this.route.navigate(['/responsaveis']);
      });
  }

  FaltaCampo(titulo: string, valor: string) {
    this.messageservice.add({severity:'error', summary: 'Erro ' + titulo, detail: valor});
  }

  Voltar() {
    this.location.back();
  }
}
