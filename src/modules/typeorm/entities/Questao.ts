  import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import QuestaoTipo from "./QuestaoTipo";
import Usuario from "./User";
import QuestaoDificuldade from "./QuestaoDificuldade";
import Disciplina from "./Disciplina";

@Entity('questao')
class Questao {
  @PrimaryGeneratedColumn('increment')
  id_dificuldade: number;

  @Column()
  enunciado: string;

  @Column()
  fg_aprovada: string;

  @ManyToOne(() => QuestaoTipo)
  @JoinColumn({ name: 'fk_tipo' })
  fk_id_tipo: QuestaoTipo;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'fk_id_usuario' })
  fk_id_usuario: Usuario;

  @ManyToOne(() => QuestaoDificuldade)
  @JoinColumn({ name: 'fk_id_dificuldade' })
  fk_id_dificuldade: QuestaoDificuldade;

  @ManyToOne(() => Disciplina)
  @JoinColumn({ name: 'fk_id_disciplina' })
  fk_id_disciplina: Disciplina;
}

export default Questao;
