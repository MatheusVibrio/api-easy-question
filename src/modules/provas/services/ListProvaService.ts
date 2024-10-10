import Prova from "@modules/typeorm/entities/Prova";
import ProvaRepository from "@modules/typeorm/repositories/ProvaRepository";
import { getCustomRepository } from "typeorm";

class ListProvaService {
    public async listarTodas(id_usuario: string): Promise<Prova[]> {
      const provaRepository = getCustomRepository(ProvaRepository);

      const provas = provaRepository.findByIdUser(id_usuario);

      return provas;
    }

    public async listarProvaDet(id_prova: string): Promise<any> {
      const provaRepository = getCustomRepository(ProvaRepository);

      // Buscar os detalhes da prova
      const rawDetails = await provaRepository.findByIdProva(id_prova);

      // Verifica se existem detalhes para a questão
      if (!rawDetails || rawDetails.length === 0) {
        throw new Error('Nenhuma prova encontrada');
      }

      // Estrutura inicial da resposta
      const provaResposta: any = {
        prova: rawDetails[0].prova,        // Dados da prova
        disciplina: rawDetails[0].disciplina,  // Dados da disciplina
        questoes: []  // Lista vazia para armazenar as questões formatadas
      };

      // Preenche a lista de questões
      rawDetails.forEach((detail: any) => {
        // Adiciona a questão se ela não estiver na lista de questões (verifica a ordem)
        if (!provaResposta.questoes.some((questao: any) => questao.ordem === detail.ordem)) {
          provaResposta.questoes.push({
            id_lcto : detail.id_lcto,
            ordem: detail.ordem,            // Ordem da questão
            enunciado: detail.enunciado,    // Enunciado da questão
            dificuldade: detail.dificuldade // Nível de dificuldade da questão
          });
        }
      });

      return provaResposta;
    }

    public async listarTodasSistema(): Promise<number> {
      const provaRepository = getCustomRepository(ProvaRepository);
      const count = await provaRepository.count();

      return count;
    }

}

export default ListProvaService;
