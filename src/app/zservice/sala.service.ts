import { Sala } from './../core/model';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class SalaFiltro {
  pagina = 0;
  itensPorPagina = 7;
}

@Injectable({
  providedIn: 'root'
})
export class SalaService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/salas`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: SalaFiltro): Promise<any> {
    const params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const salas = response;

        const resultado = {
          salas,
          total: response.totalElements
        };

        return resultado;
      });
  }

  Adicionar(sala): Promise<Sala> {
    return this.http.post<Sala>(`${this.url}`, sala).toPromise();
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const sala = response as Sala;
        return sala;
      });
  }

  Atualizar(sala: Sala): Promise<any> {
    return this.http.put(`${this.url}/${sala.codigo}`, sala)
      .toPromise()
      .then(response => {
        const salaalterado = response as Sala;
        return salaalterado;
      });
  }

  Remover(codigo: number): Promise<any> {
    return this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

}
