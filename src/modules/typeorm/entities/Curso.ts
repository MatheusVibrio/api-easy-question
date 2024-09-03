import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('curso')
class Curso {
  @PrimaryGeneratedColumn('increment')
  id_curso: number;

  @Column()
  descricao: string;
}

export default Curso;
