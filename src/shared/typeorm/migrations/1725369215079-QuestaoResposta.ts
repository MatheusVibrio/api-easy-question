import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class QuestaoResposta1725369215079 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'questao_resposta',
          columns: [
            {
              name: "id_resposta",
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
              name: 'fg_correta',
              type: 'varchar(1)',
            },
            {
              name: 'fk_id_questao',
              type: "integer"
            },
          ],
        })
      );

      await queryRunner.createForeignKey("questao_resposta", new TableForeignKey({
            columnNames: ["fk_id_questao"],
            referencedTableName: "questao",
            referencedColumnNames: ["id_questao"],
            name: "FK_QUESTAO",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('questao_resposta');
    }

}
