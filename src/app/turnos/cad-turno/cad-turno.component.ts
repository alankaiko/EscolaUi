import { TurnoService } from './../../zservice/turno.service';
import { Turno } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cad-turno',
  templateUrl: './cad-turno.component.html',
  styleUrls: ['./cad-turno.component.css']
})
export class CadTurnoComponent implements OnInit {
  formulario: FormGroup;
  display: true;

  constructor(private service: TurnoService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location) {}

  ngOnInit() {
    this.CriarFormulario(new Turno());
    const cod = this.rota.snapshot.params.cod;

    if (cod) {
      this.CarregarTurnos(cod);
    }
  }
  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(turno: Turno) {
    this.formulario = this.formbuilder.group({
      codigo: [null, turno.codigo],
      turno: [null, turno.turno]
    });
  }

  CarregarTurnos(codigo: number) {
    this.service.BuscarPorId(codigo).then(turno => this.formulario.patchValue(turno));
  }

  Salvar() {
    if (this.editando) {
      this.AtualizarTurnos();
    } else {
      this.formulario.patchValue(this.AdicionarTurnos());
    }
    this.CriarFormulario(new Turno());
  }

  AdicionarTurnos() {
    return this.service.Adicionar(this.formulario.value)
      .then(salvo => {
        this.route.navigate(['/turnos']);
      });
  }

  AtualizarTurnos() {
    this.service.Atualizar(this.formulario.value)
      .then(turno => {
        this.formulario.patchValue(turno);
        this.route.navigate(['/turnos']);
      });
  }

  Voltar() {
    this.location.back();
  }
}
