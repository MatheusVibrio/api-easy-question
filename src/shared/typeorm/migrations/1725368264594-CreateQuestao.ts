import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateQuestao1725368264594 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'questao',
          columns: [
            {
              name: "id_questao",
              type: "integer",
              isPrimary: true,
              isGenerated: true,
              generationStrategy: "increment"
            },
            {
              name: 'enunciado',
              type: "varchar",
              length: "200"
            },
            {
              name: 'fg_aprovada',
              type: 'varchar(1)',
            },
            {
              name: 'fk_tipo',
              type: "integer"
            },
            {
              name: 'fk_id_usuario',
              type: "integer"
            },
            {
              name: 'fk_id_dificuldade',
              type: "integer"
            },
            {
              name: 'fk_id_disciplina',
              type: "integer"
            },
          ],
        })
      );

       await queryRunner.createForeignKey("questao", new TableForeignKey({
            columnNames: ["fk_tipo"],
            referencedTableName: "questao_tipo",
            referencedColumnNames: ["id_tipo"],
            name: "FK_TIPO",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }));

        await queryRunner.createForeignKey("questao", new TableForeignKey({
            columnNames: ["fk_id_usuario"],
            referencedTableName: "usuarios",
            referencedColumnNames: ["id_usuario"],
            name: "FK_USUARIO",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }));

        await queryRunner.createForeignKey("questao", new TableForeignKey({
            columnNames: ["fk_id_dificuldade"],
            referencedTableName: "questao_dificuldade",
            referencedColumnNames: ["id_dificuldade"],
            name: "FK_DIFICULDADE",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }));

        await queryRunner.createForeignKey("questao", new TableForeignKey({
            columnNames: ["fk_id_disciplina"],
            referencedTableName: "disciplina",
            referencedColumnNames: ["id_disciplina"],
            name: "FK_DISCIPLINA",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('questao');
    }

}
