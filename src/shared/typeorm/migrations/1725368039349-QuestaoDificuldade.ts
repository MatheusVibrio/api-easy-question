import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class QuestaoDificuldade1725368039349 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'questao_dificuldade',
          columns: [
            {
              name: "id_dificuldade",
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
            INSERT INTO questao_dificuldade (descricao) VALUES
            ('Fácil'),
            ('Médio'),
            ('Difícil');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('questao_dificuldade');
    }

}
