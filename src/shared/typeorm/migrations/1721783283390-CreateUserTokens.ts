import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserTokens1721782059138 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'usuario_tokens',
          columns: [
            {
              name: 'id_usuario_tokens',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'token',
              type: 'uuid',
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'fk_usuario',
              type: 'uuid',
            },
            {
              name: 'created_at',
              type: 'timestamp with time zone',
              default: 'now()',
            },
            {
              name: 'updated_at',
               type: 'timestamp with time zone',
              default: 'now()',
            },
          ],
          foreignKeys: [
            {
              name: 'TokenUser',
              referencedTableName: 'usuarios',
              referencedColumnNames: ['id_usuario'],
              columnNames: ['fk_usuario'],
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE'
            }
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('usuario_tokens');
    }
}
