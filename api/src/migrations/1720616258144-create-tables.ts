import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CreateTables1720616258144 implements MigrationInterface {
    name = 'CreateTables1720616258144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Check if the "todo" table and "title" column exist
        const table = await queryRunner.getTable("todo");
        if (table && table.findColumnByName("title")) {
            try {
                // Using TypeORM's schema builder methods for better readability and maintainability
                await queryRunner.changeColumn("todo", "title", new TableColumn({
                    name: "title",
                    type: "varchar", // Adjust type if necessary
                    isNullable: false,
                }));
                console.log("Altered 'title' column in 'todo' table to NOT NULL successfully.");
            } catch (error) {
                console.error("Error altering 'title' column in 'todo' table:", error);
            }
        } else {
            console.log("'todo' table or 'title' column does not exist.");
        }
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("todo");
        if (table && table.findColumnByName("title")) {
            try {
                await queryRunner.changeColumn("todo", "title", new TableColumn({
                    name: "title",
                    type: "varchar", // Adjust type if necessary
                    isNullable: true,
                }));
                console.log("Reverted 'title' column in 'todo' table to allow NULL successfully.");
            } catch (error) {
                console.error("Error reverting 'title' column in 'todo' table:", error);
            }
        } else {
            console.log("'todo' table or 'title' column does not exist.");
        }
    }
}
