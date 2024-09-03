import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCurso1725366326216 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.createTable(
        new Table({
          name: 'curso',
          columns: [
            {
              name: "id_curso",
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
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.dropTable('curso');

    }

}
