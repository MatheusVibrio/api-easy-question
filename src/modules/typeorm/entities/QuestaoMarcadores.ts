import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Questao from "./Questao";

@Entity('questao_marcadores')
class QuestaoMarcadores {
  @PrimaryGeneratedColumn('increment')
  id_marcador: number;

  @ManyToOne(() => Questao)
  @JoinColumn({ name: 'fk_id_questao' })
  fk_id_questao: Questao;

  @Column()
  marcador: string;
}

export default QuestaoMarcadores;
