import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Usuario from "./User";

@Entity('usuario_curso')
class Curso {
  @PrimaryGeneratedColumn('increment')
  id_lcto: number;

  @ManyToOne(() => Curso)
  @JoinColumn({ name: 'fk_id_curso' })
  fk_id_curso: Curso;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'fk_id_usuario' })
  fk_id_usuario: Usuario;
}

export default Curso;
