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
      and qt.fg_aprovada = 'S'
      order by qt.enunciado asc;
    `;

    const result = await this.query(query, [id_user]);

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
