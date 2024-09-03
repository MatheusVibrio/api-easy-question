import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('usuario_tokens')
class UsuarioToken {
  @PrimaryGeneratedColumn('increment')
  id_usuario_tokens: number;

  @Column()
  @PrimaryGeneratedColumn('increment')
  token: number;

  @Column()
  fk_usuario: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UsuarioToken;
