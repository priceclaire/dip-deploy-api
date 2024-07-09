import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1720566651474 implements MigrationInterface {
    name = 'CreateTables1720566651474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" ALTER COLUMN "title" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" ALTER COLUMN "title" DROP NOT NULL`);
    }

}
