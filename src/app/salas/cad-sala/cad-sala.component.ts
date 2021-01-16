import { Sala } from './../../core/model';
import { SalaService } from './../../zservice/sala.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cad-sala',
  templateUrl: './cad-sala.component.html',
  styleUrls: ['./cad-sala.component.css'],
  providers: [ MessageService]
})
export class CadSalaComponent implements OnInit {
  formulario: FormGroup;
  display: true;

  constructor(private service: SalaService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location,
              private messageservice: MessageService) {}

  ngOnInit() {
    this.CriarFormulario(new Sala());
    const cod = this.rota.snapshot.params.cod;

    if (cod) {
      this.CarregarSalas(cod);
    }
  }
  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(sala: Sala) {
    this.formulario = this.formbuilder.group({
      codigo: [null, sala.codigo],
      sala: [null, sala.sala]
    });
  }

  CarregarSalas(codigo: number) {
    this.service.BuscarPorId(codigo).then(sala => this.formulario.patchValue(sala));
  }

  Salvar() {
    if (this.formulario.get('sala').value === '' || this.formulario.get('sala').value === null || this.formulario.get('sala').value === undefined){
      this.FaltaCampo('Sala', 'Informe a Sala corretamente');
      return;
    }

    if (this.editando) {
      this.AtualizarSalas();
    } else {
      this.formulario.patchValue(this.AdicionarSalas());
    }
    this.CriarFormulario(new Sala());
  }

  AdicionarSalas() {
    return this.service.Adicionar(this.formulario.value)
      .then(salvo => {
        this.route.navigate(['/salas']);
      });
  }

  AtualizarSalas() {
    this.service.Atualizar(this.formulario.value)
      .then(sala => {
        this.formulario.patchValue(sala);
        this.route.navigate(['/salas']);
      });
  }

  FaltaCampo(titulo: string, valor: string) {
    this.messageservice.add({severity:'error', summary: 'Erro ' + titulo, detail: valor});
  }

  Voltar() {
    this.location.back();
  }
}
