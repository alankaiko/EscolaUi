import { Observable } from 'rxjs';
import { RegistroMovimentacao } from './../core/model';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

export class RegistroMovimentacaoFiltro {
  pagina = 0;
  itensPorPagina = 9;
  descricao: string;
  sala: string;
  dataregistro: Date;
}

@Injectable({
  providedIn: 'root'
})
export class RegistromovimentacaoService {
  url: string;
  urlaluno: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/registros`;
    this.urlaluno = `${environment.apiUrl}/alunos`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: RegistroMovimentacaoFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.dataregistro) {
      params = params.append('dataregistro',
        moment(filtro.dataregistro).format('YYYY-MM-DD'));
    }

    if (filtro.sala) {
      params = params.append('sala', filtro.sala);
    }

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const registros = response;

        const resultado = {
          registros,
          total: response.totalElements
        };

        return resultado;
      });
  }

  Adicionar(registro: RegistroMovimentacao): Promise<any> {
    return this.http.post<RegistroMovimentacao>(`${this.url}`, registro).toPromise();
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const registro = response as RegistroMovimentacao;
        this.converterStringsParaDatas([registro]);

        return registro;
      });
  }

  Atualizar(registro: RegistroMovimentacao): Promise<any> {
    return this.http.put(`${this.url}/${registro.codigo}`, registro)
      .toPromise()
      .then(response => {
        const registroalterado = response as RegistroMovimentacao;
        this.converterStringsParaDatas([registroalterado]);

        return registroalterado;
      });
  }

  Remover(codigo: number): Promise<any> {
    return this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  private converterStringsParaDatas(registros: RegistroMovimentacao[]) {
    for (const reg of registros) {
      if (reg.dataregistro !== null) {
        reg.dataregistro = moment(reg.dataregistro, 'YYYY-MM-DD').toDate();
      }


    }
  }


  PegarImagem(codigo: number): Observable<Blob> {
    return this.http.get(`${this.urlaluno}/imagem/${codigo}`, { responseType: 'blob' });
  }

  PegarImagems(codigo: number): Observable<string> {
    return this.http.get(`${this.urlaluno}/imagemstring/${codigo}`, { responseType: 'text' });
  }

  PegarImagemString(codigo: number): Observable<string> {
    return this.http.get(`${this.urlaluno}/imagemstring/${codigo}`, { responseType: 'text' });
  }

}
