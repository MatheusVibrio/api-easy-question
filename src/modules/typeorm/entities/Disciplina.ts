import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Curso from "./Curso";

@Entity('disciplina')
class Disciplina {
  @PrimaryGeneratedColumn('increment')
  id_disciplina: number;

  @Column()
  descricao: string;

  @ManyToOne(() => Curso)
  @JoinColumn({ name: 'fk_id_curso' })
  fk_id_curso: Curso;

}

export default Disciplina;
