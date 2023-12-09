import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1702138163027 implements MigrationInterface {
    name = 'Migrations1702138163027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "totalAmount" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_books_book" ("orderId" uuid NOT NULL, "bookId" uuid NOT NULL, CONSTRAINT "PK_d026bed0a3d89a3a151f8495742" PRIMARY KEY ("orderId", "bookId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f9f5625e43d8cf925815e47738" ON "order_books_book" ("orderId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d75ef4e02d66e5a17a105dac4f" ON "order_books_book" ("bookId") `);
        await queryRunner.query(`CREATE TABLE "book_orders_order" ("bookId" uuid NOT NULL, "orderId" uuid NOT NULL, CONSTRAINT "PK_b085269424bb77412b3e22e5df6" PRIMARY KEY ("bookId", "orderId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0d677a5e7add43240555a3c0af" ON "book_orders_order" ("bookId") `);
        await queryRunner.query(`CREATE INDEX "IDX_08056490d499838d981914b01b" ON "book_orders_order" ("orderId") `);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_books_book" ADD CONSTRAINT "FK_f9f5625e43d8cf925815e47738e" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_books_book" ADD CONSTRAINT "FK_d75ef4e02d66e5a17a105dac4f3" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_orders_order" ADD CONSTRAINT "FK_0d677a5e7add43240555a3c0af2" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_orders_order" ADD CONSTRAINT "FK_08056490d499838d981914b01b1" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_orders_order" DROP CONSTRAINT "FK_08056490d499838d981914b01b1"`);
        await queryRunner.query(`ALTER TABLE "book_orders_order" DROP CONSTRAINT "FK_0d677a5e7add43240555a3c0af2"`);
        await queryRunner.query(`ALTER TABLE "order_books_book" DROP CONSTRAINT "FK_d75ef4e02d66e5a17a105dac4f3"`);
        await queryRunner.query(`ALTER TABLE "order_books_book" DROP CONSTRAINT "FK_f9f5625e43d8cf925815e47738e"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_08056490d499838d981914b01b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0d677a5e7add43240555a3c0af"`);
        await queryRunner.query(`DROP TABLE "book_orders_order"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d75ef4e02d66e5a17a105dac4f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f9f5625e43d8cf925815e47738"`);
        await queryRunner.query(`DROP TABLE "order_books_book"`);
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
