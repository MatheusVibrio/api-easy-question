import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateUsuario1725366988466 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'usuarios',
          columns: [
            {
              name: "id_usuario",
              type: "integer",
              isPrimary: true,
              isGenerated: true,
              generationStrategy: "increment"
            },
            {
              name: 'nome',
              type: "varchar",
              length: "100",
            },
            {
              name: 'email',
              type: "varchar",
              length: "100",
              isUnique: true,
            },
            {
              name: 'senha',
              type: "varchar",
              length: "100"
            },
            {
              name: 'telefone',
              type: "varchar",
              length: "20"
            },
            {
              name: 'fg_primeiro_acesso',
              type: 'varchar(1)',
            },
            {
              name: 'avatar',
              type: "varchar",
              length: "100",
              isNullable: true,
            },
            {
              name: 'created_at',
              type: 'timestamp with time zone',
              default: 'now()',
            },
            {
              name: 'updated_at',
               type: 'timestamp with time zone',
              default: 'now()',
            },
             {
              name: 'fk_id_tipo',
              type: "integer"
            },
          ],
        })
      )

      // Adição da chave estrangeira `fk_id_endereco` para a tabela `endereco`
        await queryRunner.createForeignKey("usuarios", new TableForeignKey({
            columnNames: ["fk_id_tipo"],
            referencedTableName: "usuario_tipo",
            referencedColumnNames: ["id_tipo"],
            name: "FK_TIPO_USER",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('usuarios');
    }

}
