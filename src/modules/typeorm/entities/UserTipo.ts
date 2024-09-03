import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuario_tipo')
class UserTipo {
  @PrimaryGeneratedColumn('increment')
  id_tipo: number;

  @Column()
  descricao: string;

  @Column()
  fg_supervisor: string;
}

export default UserTipo;
