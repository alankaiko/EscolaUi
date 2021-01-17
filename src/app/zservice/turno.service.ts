import { Sala } from './../core/model';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Turno } from '../core/model';

export class TurnoFiltro {
  pagina = 0;
  itensPorPagina = 9;
}

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  url: string;
  urlsala: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/turnos`;
    this.urlsala = `${environment.apiUrl}/salas`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: TurnoFiltro): Promise<any> {
    const params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const turnos = response;

        const resultado = {
          turnos,
          total: response.totalElements
        };

        return resultado;
      });
  }

  Adicionar(turno): Promise<Turno> {
    return this.http.post<Turno>(`${this.url}`, turno).toPromise();
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const turno = response as Turno;
        return turno;
      });
  }

  Atualizar(turno: Turno): Promise<any> {
    return this.http.put(`${this.url}/${turno.codigo}`, turno)
      .toPromise()
      .then(response => {
        const turnoalterado = response as Turno;
        return turnoalterado;
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

}
