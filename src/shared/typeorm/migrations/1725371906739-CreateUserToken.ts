import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateUserToken1725371906739 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
        new Table({
          name: 'usuario_tokens',
          columns: [
            {
              name: "id_usuario_tokens",
              type: "integer",
              isPrimary: true,
              isGenerated: true,
              generationStrategy: "increment"
            },
            {
              name: "token",
              type: "integer",
              isGenerated: true,
              generationStrategy: "increment"
            },
            {
              name: 'fk_usuario',
              type: "integer"
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
          ],
        })
      );

      await queryRunner.createForeignKey("usuario_tokens", new TableForeignKey({
            columnNames: ["fk_usuario"],
            referencedTableName: "usuarios",
            referencedColumnNames: ["id_usuario"],
            name: "FK_USUARIO",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('usuario_tokens');
    }
}
