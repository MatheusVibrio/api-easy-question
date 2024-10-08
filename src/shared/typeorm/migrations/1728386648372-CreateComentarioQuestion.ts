import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateComentarioQuestion1728386648372 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE questao
            ADD COLUMN comentario VARCHAR(255)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE questao
            DROP COLUMN comentario
        `);
    }

}
