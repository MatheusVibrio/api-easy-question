import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class UsuarioTipo1725366652951 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'usuario_tipo',
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
              length: "100",
            },
            {
              name: "fg_supervisor",
              type: 'varchar(1)',
            },
          ],
        })
      );

       // Inserção dos dados iniciais
        await queryRunner.query(`
            INSERT INTO usuario_tipo (descricao,fg_supervisor) VALUES
            ('Professor', 'N'),
            ('Auditor', 'S'),
            ('Coordenador', 'S');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('usuario_tipo');
    }

}
