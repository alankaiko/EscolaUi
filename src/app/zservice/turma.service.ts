import { Sala, Turno } from './../core/model';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Turma } from '../core/model';

export class TurmaFiltro {
  pagina = 0;
  itensPorPagina = 7;
}

@Injectable({
  providedIn: 'root'
})
export class TurmaService {
  url: string;
  urlsala: string;
  urlturno: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/turmas`;
    this.urlsala = `${environment.apiUrl}/salas`;
    this.urlturno = `${environment.apiUrl}/turnos`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: TurmaFiltro): Promise<any> {
    const params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const turmas = response;

        const resultado = {
          turmas,
          total: response.totalElements
        };

        return resultado;
      });
  }

  Adicionar(turma): Promise<Turma> {
    return this.http.post<Turma>(`${this.url}`, turma).toPromise();
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const turma = response as Turma;
        return turma;
      });
  }

  Atualizar(turma: Turma): Promise<any> {
    return this.http.put(`${this.url}/${turma.codigo}`, turma)
      .toPromise()
      .then(response => {
        const turmalterado = response as Turma;
        return turmalterado;
      });
  }

  Remover(codigo: number): Promise<any> {
    return this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  BuscarSalas() {
    return this.http.get<Sala[]>(this.urlsala).toPromise().then(response => response);
  }

  BuscarTurno() {
    return this.http.get<Turno[]>(this.urlturno).toPromise().then(response => response);
  }
}
