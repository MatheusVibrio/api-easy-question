import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateProva1725369452146 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'prova',
          columns: [
            {
              name: "id_prova",
              type: "integer",
              isPrimary: true,
              isGenerated: true,
              generationStrategy: "increment"
            },
            {
              name: 'descricao',
              type: "varchar",
              length: "100"
            },
            {
              name: 'fk_id_disciplina',
              type: "integer"
            },
            {
              name: 'fk_id_usuario',
              type: "integer"
            },
          ],
        })
      );

      await queryRunner.createForeignKey("prova", new TableForeignKey({
            columnNames: ["fk_id_usuario"],
            referencedTableName: "usuarios",
            referencedColumnNames: ["id_usuario"],
            name: "FK_USUARIO",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }));

        await queryRunner.createForeignKey("prova", new TableForeignKey({
            columnNames: ["fk_id_disciplina"],
            referencedTableName: "disciplina",
            referencedColumnNames: ["id_disciplina"],
            name: "FK_DISCIPLINA",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('prova');
    }

}
