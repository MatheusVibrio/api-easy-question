import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('questao_tipo')
class QuestaoTipo {
  @PrimaryGeneratedColumn('increment')
  id_tipo: number;

  @Column()
  descricao: string;
}

export default QuestaoTipo;
