import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('questao_dificuldade')
class QuestaoDificuldade {
  @PrimaryGeneratedColumn('increment')
  id_dificuldade: number;

  @Column()
  descricao: string;
}

export default QuestaoDificuldade;
