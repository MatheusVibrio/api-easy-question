import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class UsuarioCurso1725367389168 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'usuario_curso',
          columns: [
            {
              name: "id_lcto",
              type: "integer",
              isPrimary: true,
              isGenerated: true,
              generationStrategy: "increment"
            },
            {
              name: 'fk_id_curso',
              type: "integer",
            },
            {
              name: 'fk_id_usuario',
              type: "integer",
            },
          ],
        })
      );

      await queryRunner.createForeignKey("usuario_curso", new TableForeignKey({
            columnNames: ["fk_id_curso"],
            referencedTableName: "curso",
            referencedColumnNames: ["id_curso"],
            name: "FK_CURSO",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }));

      await queryRunner.createForeignKey("usuario_curso", new TableForeignKey({
          columnNames: ["fk_id_usuario"],
          referencedTableName: "usuarios",
          referencedColumnNames: ["id_usuario"],
          name: "FK_USUARIO",
          onDelete: "CASCADE",
          onUpdate: "CASCADE"
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('usuario_curso');
    }

}
