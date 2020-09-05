import { Aluno } from './../core/model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export class AlunosFiltro {
  pagina = 0;
  itensPorPagina = 7;
}

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/alunos`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: AlunosFiltro): Promise<any> {
    const params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const alunos = response;

        const resultado = {
          alunos,
          total: response.totalElements
        };

        return resultado;
      });
  }

  Adicionar(aluno): Promise<Aluno> {
    return this.http.post<Aluno>(`${this.url}`, aluno).toPromise();
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const aluno = response as Aluno;

        return aluno;
      });
  }

  Atualizar(aluno: Aluno): Promise<any> {
    return this.http.put(`${this.url}/${aluno.codigo}`, aluno)
      .toPromise()
      .then(response => {
        const alunoalterado = response as Aluno;

        return alunoalterado;
      });
  }

  Remover(codigo: number): Promise<any> {
    return this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

}
