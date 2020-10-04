import { Cartao } from './../../core/model';
import { CartaoService } from './../../zservice/cartao.service';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import onScan from 'onscan.js/onscan.js';


@Component({
  selector: 'app-cad-cartao',
  templateUrl: './cad-cartao.component.html',
  styleUrls: ['./cad-cartao.component.css']
})
export class CadCartaoComponent implements OnInit {
  display: boolean;
  formulario: FormGroup;
  turmas: any[];
  alunos: any[];

  constructor(private service: CartaoService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.CriarFormulario(new Cartao());
    const codcartao = this.rota.snapshot.params.cod;

    if (codcartao) {
      this.CarregarConvenios(codcartao);
    }
    this.Escanear();
  }

  Escanear() {
    try {
      onScan.attachTo(document, {
        onScan: function(sCode) {
          const contentDiv = document.getElementById('codigobarras') as HTMLInputElement;
          contentDiv.value = sCode;
        }
      });

    } catch (error) {
      console.log(error);
    }
  }

  CriarFormulario(cartao: Cartao) {
    this.formulario = this.formbuilder.group({
      codigo: [null, cartao.codigo],
      titulo: [null, cartao.titulo],
      descricao: [null, cartao.descricao],
      codigobarras: [null, cartao.codigobarras],
      aluno: this.formbuilder.group({
        codigo: [null, cartao.aluno.codigo]
      }),
      turma: this.formbuilder.group({
        codigo: [null, cartao.turma.codigo]
      })
    });
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }


  CarregarConvenios(codigo: number) {
    this.service.BuscarPorId(codigo).then(cartao => this.formulario.patchValue(cartao));
  }

  Salvar(form: FormControl) {
    const valor = document.getElementById('codigobarras') as HTMLInputElement;
    this.formulario.controls['codigobarras'].setValue(valor.value);

    if (this.editando) {
      this.AtualizarCartoes();
    } else {
      this.formulario.patchValue(this.AdicionarCartoes());
    }
    this.CriarFormulario(new Cartao());

  }

  AdicionarCartoes() {
    return this.service.Adicionar(this.formulario.value)
      .then(salvo => {
        this.route.navigate(['/cartoes']);
      });
  }

  AtualizarCartoes() {
    this.service.Atualizar(this.formulario.value)
      .then(cartao => {
        this.formulario.patchValue(cartao);
        this.route.navigate(['/cartoes']);
      });
  }

  BuscarAlunos() {
    return this.service.ListarTurma()
    .then(response => {
      this.turmas = response
        .map(turma => ({ label: turma.nome, value: turma.codigo }));
    });
  }

  BuscarTurma() {
    return this.service.ListarTurma()
    .then(response => {
      this.turmas = response
        .map(turma => ({ label: turma.nome, value: turma.codigo }));
    });
  }

  Voltar() {
    this.location.back();
  }

}
