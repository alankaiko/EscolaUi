import { AlunoService } from './../../zservice/aluno.service';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from 'src/app/core/model';

@Component({
  selector: 'app-cad-aluno',
  templateUrl: './cad-aluno.component.html',
  styleUrls: ['./cad-aluno.component.css']
})
export class CadAlunoComponent implements OnInit {
  formulario: FormGroup;
  display: true;
  series: any[];
  salas: any[];
  turnos: any[];
  turmas: any[];
  responsaveis: any[];


  constructor(private service: AlunoService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location) {}

  ngOnInit() {
    this.CriarFormulario(new Aluno());
    const cod = this.rota.snapshot.params.cod;

    if (cod) {
      this.CarregarAlunos(cod);
    }

    this.BurcarResppedagogico();
    this.BuscarSala();
    this.BuscarSerie();
    this.BuscarTurma();
    this.BuscarTurno();
  }
  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(aluno: Aluno) {
    this.formulario = this.formbuilder.group({
      codigo: [null, aluno.codigo],
      nome: [null, aluno.nome],
      sexo: [null, aluno.sexo],
      matricula: [null, aluno.matricula],
      responsavel: this.formbuilder.group({
        nomemae: [null, aluno.responsavel.nomemae],
        telefone: [null, aluno.responsavel.telefone]
      }),
      serie: this.formbuilder.group({
        codigo: [null, aluno.serie.codigo]
      }),
      turma: this.formbuilder.group({
        codigo: [null, aluno.turma.codigo]
      }),
      resppedagogico: this.formbuilder.group({
        codigo: [null, aluno.resppedagogico.codigo]
      }),
      turno: this.formbuilder.group({
        codigo: [null, aluno.turno.codigo]
      }),
      sala: this.formbuilder.group({
        codigo: [null, aluno.sala.codigo]
      })
    });
  }

  CarregarAlunos(codigo: number) {
    this.service.BuscarPorId(codigo).then(aluno => this.formulario.patchValue(aluno));
  }

  Salvar() {
    if (this.editando) {
      this.AtualizarAlunos();
    } else {
      this.formulario.patchValue(this.AdicionarAlunos());
    }
    this.CriarFormulario(new Aluno());
  }

  AdicionarAlunos() {
    return this.service.Adicionar(this.formulario.value)
      .then(salvo => {
        this.route.navigate(['/alunos']);
      });
  }

  AtualizarAlunos() {
    this.service.Atualizar(this.formulario.value)
      .then(aluno => {
        this.formulario.patchValue(aluno);
        this.route.navigate(['/alunos']);
      });
  }

  Voltar() {
    this.location.back();
  }

  BuscarSerie() {
    return this.service.ListarSerie()
    .then(response => {
      this.series = response
        .map(serie => ({ label: serie.serie, value: serie.codigo }));
    });
  }

  BurcarResppedagogico() {
    return this.service.ListarResp()
    .then(response => {
      this.responsaveis = response
        .map(resp => ({ label: resp.professor, value: resp.codigo }));
    });
  }

  BuscarTurma() {
    return this.service.ListarTurma()
    .then(response => {
      this.turmas = response
        .map(turma => ({ label: turma.nome, value: turma.codigo }));
    });
  }

  BuscarTurno() {
    return this.service.ListarTurno()
    .then(response => {
      this.turnos = response
        .map(turno => ({ label: turno.turno, value: turno.codigo }));
    });
  }

  BuscarSala() {
    return this.service.ListarSala()
    .then(response => {
      this.salas = response
        .map(sala => ({ label: sala.sala, value: sala.codigo }));
    });
  }
}
