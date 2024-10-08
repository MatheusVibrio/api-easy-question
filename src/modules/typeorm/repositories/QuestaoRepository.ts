import { EntityRepository, Repository } from "typeorm";
import { getCustomRepository } from 'typeorm';
import Questao from "../entities/Questao";
import QuestaoMarcadoresRepository from "./QuestaoMarcadoresRepository";
import QuestaoRespostaRepository from "./QuestaoRespostaRepository";

@EntityRepository(Questao)
class QuestaoRepository extends Repository<Questao>{
  public async countAprovadas(): Promise<number> {
  const count = await this.count({
    where: {
      fg_aprovada: 'S',
    },
  });

  return count;
}

public async countPorUsuario(id_user: string): Promise<number> {
  const count = await this.count({
    where: {
      fk_id_usuario: id_user,
    },
  });

  return count;
}

public async findById(id_questao: string): Promise<Questao | undefined> {
  const tipo = await this.findOne({
      where: {
        id_questao,
      },
    });

  return tipo;
}

public async listaQuestoesUser(id_user: string): Promise<number> {
  const query = `
      select qt.id_questao,
             qt.enunciado,
             cs.descricao as curso,
             ds.descricao as disciplina,
             tp.descricao as tipo,
             df.descricao as dificuldade
      from questao qt
      inner join disciplina ds on (ds.id_disciplina = qt.fk_id_disciplina)
      inner join curso cs on (ds.fk_id_curso = cs.id_curso)
      inner join questao_tipo tp on (tp.id_tipo = qt.fk_tipo)
      inner join questao_dificuldade df on (df.id_dificuldade = qt.fk_id_dificuldade)
      where qt.fk_id_usuario = $1
      order by qt.enunciado asc;
    `;

    const result = await this.query(query, [id_user]);

    return result;
}

public async listaQuestoesUserReprovadas(id_user: string): Promise<number> {
  const query = `
      select qt.id_questao,
             qt.enunciado,
             cs.descricao as curso,
             ds.descricao as disciplina,
             tp.descricao as tipo,
             df.descricao as dificuldade,
             qt.comentario
      from questao qt
      inner join disciplina ds on (ds.id_disciplina = qt.fk_id_disciplina)
      inner join curso cs on (ds.fk_id_curso = cs.id_curso)
      inner join questao_tipo tp on (tp.id_tipo = qt.fk_tipo)
      inner join questao_dificuldade df on (df.id_dificuldade = qt.fk_id_dificuldade)
      where qt.fk_id_usuario = $1
      and qt.fg_aprovada = 'N'
      order by qt.enunciado asc;
    `;

    const result = await this.query(query, [id_user]);

    return result;
}

public async listaQuestoesUserAprovadas(id_user: string): Promise<number> {
  const query = `
      select qt.id_questao,
             qt.enunciado,
             cs.descricao as curso,
             ds.descricao as disciplina,
             tp.descricao as tipo,
             df.descricao as dificuldade
      from questao qt
      inner join disciplina ds on (ds.id_disciplina = qt.fk_id_disciplina)
      inner join curso cs on (ds.fk_id_curso = cs.id_curso)
      inner join questao_tipo tp on (tp.id_tipo = qt.fk_tipo)
      inner join questao_dificuldade df on (df.id_dificuldade = qt.fk_id_dificuldade)
      where qt.fk_id_usuario = $1
      and qt.fg_aprovada = 'S'
      order by qt.enunciado asc;
    `;

    const result = await this.query(query, [id_user]);

    return result;
}

public async listaQuestoesUserAnalise(id_curso: string): Promise<number> {
  const query = `
      SELECT qt.id_questao,
             qt.enunciado,
             cs.descricao AS curso,
             ds.descricao AS disciplina,
             tp.descricao AS tipo,
             df.descricao AS dificuldade
      FROM questao qt
      INNER JOIN disciplina ds ON ds.id_disciplina = qt.fk_id_disciplina
      INNER JOIN curso cs ON ds.fk_id_curso = cs.id_curso
      INNER JOIN questao_tipo tp ON tp.id_tipo = qt.fk_tipo
      INNER JOIN questao_dificuldade df ON df.id_dificuldade = qt.fk_id_dificuldade
      INNER JOIN usuarios us ON us.fk_id_curso = cs.id_curso
      WHERE qt.fg_aprovada = 'A'
      and cs.id_curso = $1
      ORDER BY qt.id_questao ASC;
    `;

    const result = await this.query(query, [id_curso]);

    return result;
}

public async listaQuestaoDetalhes(id_questao: string): Promise<any[]> {
  const query = `
      select qt.id_questao,
             qt.enunciado,
             cs.descricao as curso,
             ds.descricao as disciplina,
             df.descricao as dificuldade,
             qr.descricao as resposta,
             qr.fg_correta
      from questao qt
      inner join disciplina ds on (ds.id_disciplina = qt.fk_id_disciplina)
      inner join curso cs on (ds.fk_id_curso = cs.id_curso)
      inner join questao_tipo tp on (tp.id_tipo = qt.fk_tipo)
      inner join questao_dificuldade df on (df.id_dificuldade = qt.fk_id_dificuldade)
      left join questao_resposta qr on (qr.fk_id_questao = qt.id_questao)
      where qt.id_questao  = $1
    `;

    const result = await this.query(query, [id_questao]);

    return result;
}

public async deleteQuestion(id_questao: string): Promise<Questao | undefined> {
  const questao = await this.findOne({
    where: { id_questao: Number(id_questao) }, // Converte id_questao para number
  });

  if (questao) {
    // Exclui os registros relacionados da tabela questao_marcadores
    await getCustomRepository(QuestaoMarcadoresRepository).delete({
      fk_id_questao: { id_questao: Number(id_questao) }, // Ajuste para condição de busca correta
    });

    // Exclui os registros relacionados da tabela questao_resposta
    await getCustomRepository(QuestaoRespostaRepository).delete({
      fk_id_questao: { id_questao: Number(id_questao) }, // Mesmo ajuste para a outra tabela
    });

    // Agora exclui a questão em si
    await this.delete(Number(id_questao)); // Converte id_questao para number

    return questao; // Retorna a questão deletada
  }

  return undefined; // Retorna undefined se a questão não for encontrada
}

}

export default QuestaoRepository;
