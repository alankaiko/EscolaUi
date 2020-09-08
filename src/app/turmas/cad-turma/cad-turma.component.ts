import { Turma } from './../../core/model';
import { TurmaService } from './../../zservice/turma.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cad-turma',
  templateUrl: './cad-turma.component.html',
  styleUrls: ['./cad-turma.component.css']
})
export class CadTurmaComponent implements OnInit {
  formulario: FormGroup;
  display: true;

  constructor(private service: TurmaService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location) {}

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

  Voltar() {
    this.location.back();
  }
}
