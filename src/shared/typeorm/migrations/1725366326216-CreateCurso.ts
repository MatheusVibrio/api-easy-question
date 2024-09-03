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

       // Inserção dos dados iniciais
       await queryRunner.query(`
        INSERT INTO curso (descricao) VALUES
        ('ADMINISTRAÇÃO'),
        ('CIÊNCIAS CONTÁBEIS'),
        ('DIREITO'),
        ('EDUCAÇÃO FÍSICA'),
        ('ENFERMAGEM'),
        ('ENGENHARIA CIVIL'),
        ('ENGENHARIA DE SOFTWARE'),
        ('ENGENHARIA MECÂNICA'),
        ('FARMÁCIA'),
        ('FISIOTERAPIA'),
        ('MEDICINA'),
        ('ODONTOLOGIA'),
        ('PEDAGOGIA'),
        ('PSICOLOGIA');
    `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.dropTable('curso');

    }

}
