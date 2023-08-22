import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSchema1692668117174 implements MigrationInterface {
    name = 'CreateSchema1692668117174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "password" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sensor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying NOT NULL, "temperature" character varying DEFAULT '0', "user_id" uuid NOT NULL, CONSTRAINT "PK_ccc38b9aa8b3e198b6503d5eee9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sensor" ADD CONSTRAINT "FK_b5e87721110d41f88668266ae5e" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sensor" DROP CONSTRAINT "FK_b5e87721110d41f88668266ae5e"`);
        await queryRunner.query(`DROP TABLE "sensor"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
