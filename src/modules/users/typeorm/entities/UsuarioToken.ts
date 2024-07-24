import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('usuarios')
class UsuarioToken {
  @PrimaryGeneratedColumn('uuid')
  id_usuario_tokens: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  fk_usuario: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UsuarioToken;
