import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UserTipo from "./UserTipo";

@Entity('usuarios')
class Usuario {
  @PrimaryGeneratedColumn('increment')
  id_usuario: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column()
  telefone: string;

  @Column()
  fg_primeiro_acesso: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => UserTipo)
  @JoinColumn({ name: 'fk_id_tipo' })
  fk_id_tipo: UserTipo;
}

export default Usuario;
