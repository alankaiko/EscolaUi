export class Turno {
  codigo: number;
  turno: string;
}

export class Turma {
  codigo: number;
  nome: string;
  turno: Turno;
}

export class Serie {
  codigo: number;
  serie: string;
}

export class Sala {
  codigo: number;
  sala: string;
}

export class Resppedagogico {
  codigo: number;
  professor: string;
}

export class Cartao {
  codigo: number;
  titulo: string;
  descricao: string;
  codigobarras: string;
  aluno = new Aluno();
  turma = new Turma();
}


export class Aluno {
  codigo: number;
  nome: string;
  matricula: string;
  responsavel = new Responsavel();
  serie = new Serie();
  turma = new Turma();
  resppedagogico = new Resppedagogico();
  turno = new Turno();
  sala = new Sala();
  sexo: EnumSexo;
}

export class Responsavel {
  codigo: number;
  nomemae: string;
  telefone: string;
}

export enum EnumSexo {
  Masculino = 'MASCULINO',
  Feminino = 'FEMININO'
}
