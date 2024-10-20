import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import Prova from "../entities/Prova";
import ProvaQuestao from "../entities/ProvaQuestao";
import ProvaQuestaoRepository from "./ProvaQuestaoRepository";


@EntityRepository(Prova)
class ProvaRepository extends Repository<Prova> {
  public async findByIdCurso(id_curso: string): Promise<Prova | undefined> {
  const prova = await this.findOne({
      where: {
        id_curso,
      },
    });

  return prova;
  }

  public async findById(id_prova: string): Promise<Prova | undefined> {
    const prova = await this.findOne({
        where: {
          id_prova,
        },
      });

    return prova;
  }

  public async findByIdUser(id_usuario: string): Promise<Prova[]> {
    const query = `
      select pr.id_prova,
             pr.descricao,
             ds.descricao as disciplina,
             cs.descricao as curso,
             (select count(*) from prova_questao qt where qt.fk_id_prova = pr.id_prova) as questoes
      from prova pr
      inner join disciplina ds on (ds.id_disciplina  = pr.fk_id_disciplina)
      inner join curso cs      on (ds.fk_id_curso = cs.id_curso)
      where pr.fk_id_usuario = $1;
    `;

    const result = await this.query(query, [id_usuario]);

    return result;
  }

  public async findByIdProva(id_prova: string): Promise<Prova | any> {
    const query = `
      select pr.descricao as prova,
             ds.descricao as disciplina,
             pq.id_lcto,
             pq.ordem,
             qt.enunciado,
             qd.descricao as dificuldade
      from prova pr
      inner join disciplina ds on (ds.id_disciplina = pr.fk_id_disciplina)
      inner join prova_questao pq on (pr.id_prova = pq.fk_id_prova)
      inner join questao qt on (pq.fk_id_questao = qt.id_questao)
      inner join questao_dificuldade qd on (qd.id_dificuldade = qt.fk_id_dificuldade)
      where pr.id_prova = $1
      order by pq.ordem asc;
    `;

    const result = await this.query(query, [id_prova]);

    return result;
  }

  public async provaDelete(id_prova: string): Promise<boolean> {
      let isDeleted = false;

      // Exclui os registros relacionados da tabela prova_questao
      await getCustomRepository(ProvaQuestaoRepository).delete({
        fk_id_prova: { id_prova: Number(id_prova) }, // Ajuste para condição de busca correta
      });

      // Agora exclui a questão em si
      await this.delete(id_prova); // Converte id_questao para number

      isDeleted = true
      return isDeleted
  }
}

export default ProvaRepository;
