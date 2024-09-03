import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Questao from "./Questao";

@Entity('questao_dificuldade')
class QuestaoMarcadores {
  @PrimaryGeneratedColumn('increment')
  id_marcador: number;

  @Column()
  marcador: string;

  @ManyToOne(() => Questao)
  @JoinColumn({ name: 'fk_id_questao' })
  fk_id_questao: Questao;
}

export default QuestaoMarcadores;
