import { Turma } from './../../core/model';
import { TurmaService } from './../../zservice/turma.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cad-turma',
  templateUrl: './cad-turma.component.html',
  styleUrls: ['./cad-turma.component.css'],
  providers: [ MessageService]
})
export class CadTurmaComponent implements OnInit {
  formulario: FormGroup;
  display: true;

  constructor(private service: TurmaService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location,
              private messageservice: MessageService) {}

  ngOnInit() {
    this.CriarFormulario(new Turma());
    const cod = this.rota.snapshot.params.cod;

    if (cod) {
      this.CarregarTurmas(cod);
    }
  }
  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(turma: Turma) {
    this.formulario = this.formbuilder.group({
      codigo: [null, turma.codigo],
      nome: [null, turma.nome]
    });
  }

  CarregarTurmas(codigo: number) {
    this.service.BuscarPorId(codigo).then(turma => this.formulario.patchValue(turma));
  }

  Salvar() {
    if (this.formulario.get('nome').value === '' || this.formulario.get('nome').value === null || this.formulario.get('nome').value === undefined){
      this.FaltaCampo('Turma', 'Informe a Turma corretamente');
      return;
    }

    if (this.editando) {
      this.AtualizarTurmas();
    } else {
      this.formulario.patchValue(this.AdicionarTurmas());
    }
    this.CriarFormulario(new Turma());
  }

  AdicionarTurmas() {
    return this.service.Adicionar(this.formulario.value)
      .then(salvo => {
        this.route.navigate(['/turmas']);
      });
  }

  AtualizarTurmas() {
    this.service.Atualizar(this.formulario.value)
      .then(turma => {
        this.formulario.patchValue(turma);
        this.route.navigate(['/turmas']);
      });
  }

  FaltaCampo(titulo: string, valor: string) {
    this.messageservice.add({severity:'error', summary: 'Erro ' + titulo, detail: valor});
  }

  Voltar() {
    this.location.back();
  }
}
