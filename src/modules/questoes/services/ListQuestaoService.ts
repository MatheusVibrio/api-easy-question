import { getCustomRepository } from 'typeorm';
import Questao from '../../typeorm/entities/Questao';
import QuestaoRepository from '../../typeorm/repositories/QuestaoRepository';

class ListUserService {
  public async procuraAprovadas(): Promise<number> {
    const questionsRepository = getCustomRepository(QuestaoRepository);

    const questions = questionsRepository.countAprovadas();

    return questions;
  }

  public async procuraPorUsuario(id_user: string): Promise<number> {
    const questionsRepository = getCustomRepository(QuestaoRepository);

    const questions = questionsRepository.countPorUsuario(id_user);

    return questions;
  }

  public async listaQuestoes(id_user: string): Promise<number> {
    const questionsRepository = getCustomRepository(QuestaoRepository);

    const questions = questionsRepository.listaQuestoesUser(id_user);

    return questions;
  }

  public async listaQuestoesReprovadas(id_user: string): Promise<number> {
    const questionsRepository = getCustomRepository(QuestaoRepository);

    const questions = questionsRepository.listaQuestoesUserReprovadas(id_user);

    return questions;
  }

  public async listaQuestoesAprovadas(id_user: string): Promise<number> {
    const questionsRepository = getCustomRepository(QuestaoRepository);

    const questions = questionsRepository.listaQuestoesUserAprovadas(id_user);

    return questions;
  }

  public async listaQuestoesAnalise(id_curso: string): Promise<number> {
    const questionsRepository = getCustomRepository(QuestaoRepository);

    const questions = questionsRepository.listaQuestoesUserAnalise(id_curso);

    return questions;
  }

  public async listaDetalhes(id_questao: string): Promise<any> {
    const questionsRepository = getCustomRepository(QuestaoRepository);

    // Obtém os detalhes da questão e as respostas associadas
    const rawDetails = await questionsRepository.listaQuestaoDetalhes(id_questao);

    // Verifica se existem detalhes para a questão
    if (!rawDetails || rawDetails.length === 0) {
      throw new Error('Nenhuma questão encontrada');
    }

    // Cria um objeto para armazenar os detalhes da questão e agrupar as respostas e marcadores
    const questaoDetalhada: any = {
      id_questao: rawDetails[0].id_questao,
      questao: rawDetails[0].enunciado,  // Usei 'enunciado' no lugar de 'questao', pois parece ser o nome correto no banco
      disciplina: rawDetails[0].disciplina,
      dificuldade: rawDetails[0].dificuldade,
      marcadores: new Set(),  // Usamos Set para evitar duplicatas
      respostas: []  // Onde vamos adicionar as respostas
    };

    // Adiciona cada resposta à sub-lista de respostas e os marcadores sem duplicar
    rawDetails.forEach((detail: any) => {
      // Adiciona a resposta se ainda não estiver na lista
      if (!questaoDetalhada.respostas.some((r: any) => r.resposta === detail.resposta)) {
        questaoDetalhada.respostas.push({
          resposta: detail.resposta,
          correta: detail.fg_correta  // Adiciona o campo 'fg_correta' que indica se a resposta é correta
        });
      }

      // Adiciona o marcador sem duplicar
      if (detail.marcador) {
        questaoDetalhada.marcadores.add(detail.marcador);
      }
    });

    // Converte o Set de marcadores para um array
    questaoDetalhada.marcadores = Array.from(questaoDetalhada.marcadores);

    return questaoDetalhada; // Retorna a questão detalhada com respostas e marcadores agrupados
  }


}

export default ListUserService;
