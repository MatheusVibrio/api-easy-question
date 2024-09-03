import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class QuestaoMarcadores1725369095993 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.createTable(
        new Table({
          name: 'questao_marcadores',
          columns: [
            {
              name: "id_marcador",
              type: "integer",
              isPrimary: true,
              isGenerated: true,
              generationStrategy: "increment"
            },
            {
              name: 'fk_id_questao',
              type: "integer"
            },
            {
              name: 'marcador',
              type: "varchar",
              length: "100"
            },
          ],
        })
      );

      await queryRunner.createForeignKey("questao_marcadores", new TableForeignKey({
            columnNames: ["fk_id_questao"],
            referencedTableName: "questao",
            referencedColumnNames: ["id_questao"],
            name: "FK_QUESTAO",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('questao_marcadores');
    }

}
