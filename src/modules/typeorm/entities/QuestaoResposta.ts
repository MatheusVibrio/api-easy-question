import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Questao from "./Questao";

@Entity('questao_resposta')
class QuestaoResposta {
  @PrimaryGeneratedColumn('increment')
  id_resposta: number;

  @Column()
  descricao: string;

  @Column()
  fg_correta: string;

  @ManyToOne(() => Questao)
  @JoinColumn({ name: 'fk_id_questao' })
  fk_id_questao: Questao;
}

export default QuestaoResposta;
