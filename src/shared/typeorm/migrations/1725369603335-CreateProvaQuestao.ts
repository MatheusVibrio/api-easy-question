import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateProvaQuestao1725369603335 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'prova_questao',
          columns: [
            {
              name: "id_lcto",
              type: "integer",
              isPrimary: true,
              isGenerated: true,
              generationStrategy: "increment"
            },
            {
              name: 'ordem',
              type: "integer"
            },
            {
              name: 'fk_id_questao',
              type: "integer"
            },
            {
              name: 'fk_id_prova',
              type: "integer"
            },
          ],
        })
      );

      await queryRunner.createForeignKey("prova_questao", new TableForeignKey({
            columnNames: ["fk_id_questao"],
            referencedTableName: "questao",
            referencedColumnNames: ["id_questao"],
            name: "FK_QUESTAO",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }));

        await queryRunner.createForeignKey("prova_questao", new TableForeignKey({
            columnNames: ["fk_id_prova"],
            referencedTableName: "prova",
            referencedColumnNames: ["id_prova"],
            name: "FK_PROVA",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('prova_questao');
    }

}
