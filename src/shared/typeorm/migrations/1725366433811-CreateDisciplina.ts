import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateDisciplina1725366433811 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.createTable(
        new Table({
          name: 'disciplina',
          columns: [
            {
              name: "id_disciplina",
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
              name: "fk_id_curso",
              type: "integer"
            },
          ],
        })
      );

      // Adição da chave estrangeira `fk_id_endereco` para a tabela `endereco`
        await queryRunner.createForeignKey("disciplina", new TableForeignKey({
            columnNames: ["fk_id_curso"],
            referencedTableName: "curso",
            referencedColumnNames: ["id_curso"],
            name: "FK_CURSO",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('disciplina');
    }

}
