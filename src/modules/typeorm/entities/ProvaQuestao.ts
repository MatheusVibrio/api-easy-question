import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Questao from "./Questao";
import Prova from "./Prova";

@Entity('prova_questao')
class ProvaQuestao {
  @PrimaryGeneratedColumn('increment')
  id_lcto: number;

  @Column()
  ordem: number;

  @ManyToOne(() => Questao)
  @JoinColumn({ name: 'fk_id_questao' })
  fk_id_questao: Questao;

  @ManyToOne(() => Prova)
  @JoinColumn({ name: 'fk_id_prova' })
  fk_id_prova: Prova;
}

export default ProvaQuestao;
