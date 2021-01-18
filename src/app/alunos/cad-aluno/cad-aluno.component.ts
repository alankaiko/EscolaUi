import { Aluno } from './../../core/model';
import { AlunoService } from './../../zservice/aluno.service';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { isEmptyObject } from 'jquery';

@Component({
  selector: 'app-cad-aluno',
  templateUrl: './cad-aluno.component.html',
  styleUrls: ['./cad-aluno.component.css'],
  providers: [ MessageService]
})
export class CadAlunoComponent implements OnInit {
  aluno = new Aluno();
  display: true;
  series: any[];
  salas: any[];
  turnos: any[];
  turmas: any[];
  responsaveis: any[];
  conferindo = true;

  constructor(private service: AlunoService,
              private rota: ActivatedRoute,
              private route: Router,
              private location: Location,
              private messageservice: MessageService) {}

  ngOnInit() {
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
    return Boolean(this.aluno.codigo);
  }

  CarregarAlunos(codigo: number) {
    this.service.BuscarPorId(codigo).then(aluno => this.aluno = aluno);
  }

  IdentidadeImagem(): void {
    this.aluno.imagem.nomeimagem = this.aluno.nome;
    this.aluno.imagem.extensao = '.jpeg';
    this.aluno.imagem.imagem = this.aluno.imagem.imagem.imageAsBase64.replace('data:image/jpeg;base64,', '');
  }

  Salvar() {
    if (this.aluno.nome === '' || this.aluno.nome === undefined) {
      this.FaltaCampo('Nome', 'Informe o nome do aluno');
      return;
    }

    if (this.aluno.matricula === '' || this.aluno.matricula === undefined) {
      this.FaltaCampo('Matrícula', 'Informe a Matrícula do aluno');
      return;
    }

    if (isEmptyObject(this.aluno.sala)) {
      this.FaltaCampo('Sala', 'Campo SALA é obrigatório');
      return;
    }
    if (isEmptyObject(this.aluno.turno)) {
      this.FaltaCampo('Turno', 'Campo TURNO é obrigatório');
      return;
    }
    if (isEmptyObject(this.aluno.turma)) {
      this.FaltaCampo('Turma', 'Campo TURMA é obrigatório');
      return;
    }
    if (isEmptyObject(this.aluno.serie)) {
      this.FaltaCampo('Série', 'Campo SÉRIE é obrigatório');
      return;
    }
    if (isEmptyObject(this.aluno.professor)) {
      this.FaltaCampo('Professor', 'Campo PROFESSOR é obrigatório');
      return;
    }

    if (this.aluno.imagem.imagem !== null && this.aluno.imagem.imagem !== undefined){
      this.IdentidadeImagem();
    }

    if (this.editando) {
      this.AtualizarAlunos();
    } else {
      this.AdicionarAlunos();
    }
  }

  AdicionarAlunos() {
    return this.service.Adicionar(this.aluno)
      .then(salvo => {
        this.route.navigate(['/alunos']);
      });
  }

  AtualizarAlunos() {
    this.service.Atualizar(this.aluno)
      .then(aluno => {
        this.aluno = aluno;
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

  AlterarInterface() {
    if (this.conferindo === true) {
      this.conferindo = false;
    } else {
      this.conferindo = true;
    }
  }

  FaltaCampo(titulo: string, valor: string) {
    this.messageservice.add({severity:'error', summary: 'Erro ' + titulo, detail: valor});
  }
}
