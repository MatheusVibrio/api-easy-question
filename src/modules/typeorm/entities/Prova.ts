import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Disciplina from "./Disciplina";
import Usuario from "./User";

@Entity('prova')
class Prova {
  @PrimaryGeneratedColumn('increment')
  id_prova: number;

  @Column()
  descricao: string;

  @ManyToOne(() => Disciplina)
  @JoinColumn({ name: 'fk_id_disciplina' })
  fk_id_disciplina: Disciplina;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'fk_id_usuario' })
  fk_id_usuario: Usuario;
}

export default Prova;
