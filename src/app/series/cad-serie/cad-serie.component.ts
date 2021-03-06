import { SerieService } from './../../zservice/serie.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Serie } from 'src/app/core/model';
import {Location} from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cad-serie',
  templateUrl: './cad-serie.component.html',
  styleUrls: ['./cad-serie.component.css'],
  providers: [ MessageService]
})
export class CadSerieComponent implements OnInit {
  formulario: FormGroup;
  display: true;

  constructor(private service: SerieService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location,
              private messageservice: MessageService) {}

  ngOnInit() {
    this.CriarFormulario(new Serie());
    const cod = this.rota.snapshot.params.cod;

    if (cod) {
      this.CarregarSeries(cod);
    }
  }
  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(serie: Serie) {
    this.formulario = this.formbuilder.group({
      codigo: [null, serie.codigo],
      serie: [null, serie.serie]
    });
  }

  CarregarSeries(codigo: number) {
    this.service.BuscarPorId(codigo).then(serie => this.formulario.patchValue(serie));
  }

  Salvar() {
    if (this.formulario.get('serie').value === '' || this.formulario.get('serie').value === null || this.formulario.get('serie').value === undefined){
      this.FaltaCampo('Série', 'Informe a Série corretamente');
      return;
    }

    if (this.editando) {
      this.AtualizarSeries();
    } else {
      this.formulario.patchValue(this.AdicionarSeries());
    }
    this.CriarFormulario(new Serie());
  }

  AdicionarSeries() {
    return this.service.Adicionar(this.formulario.value)
      .then(salvo => {
        this.route.navigate(['/series']);
      });
  }

  AtualizarSeries() {
    this.service.Atualizar(this.formulario.value)
      .then(serie => {
        this.formulario.patchValue(serie);
        this.route.navigate(['/series']);
      });
  }

  FaltaCampo(titulo: string, valor: string) {
    this.messageservice.add({severity:'error', summary: 'Erro ' + titulo, detail: valor});
  }

  Voltar() {
    this.location.back();
  }
}
