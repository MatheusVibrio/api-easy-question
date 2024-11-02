import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class QuestaoTipo1725367950795 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'questao_tipo',
          columns: [
            {
              name: "id_tipo",
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
          ],
        })
      );

      await queryRunner.query(`
            INSERT INTO questao_tipo (descricao) VALUES
            ('Múltipla Escolha'),
            ('Discursiva');
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('questao_tipo');
    }

}
