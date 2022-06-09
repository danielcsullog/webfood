import { Migration } from '@mikro-orm/migrations';

export class Migration20220609133750 extends Migration {

  async up(): Promise<void> {
    this.addSql('PRAGMA foreign_keys = OFF;');
    this.addSql('CREATE TABLE `_knex_temp_alter245` (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `order_order_id` integer NOT NULL, `meal_id` integer NOT NULL, `amount` json NOT NULL DEFAULT null, CONSTRAINT `order_item_order_order_id_foreign` FOREIGN KEY (`order_order_id`) REFERENCES `order` (`order_id`) ON UPDATE CASCADE, CONSTRAINT `order_item_meal_id_foreign` FOREIGN KEY (`meal_id`) REFERENCES `meal` (`id`) ON UPDATE CASCADE);');
    this.addSql('INSERT INTO "_knex_temp_alter245" SELECT * FROM "order_item";;');
    this.addSql('DROP TABLE "order_item";');
    this.addSql('ALTER TABLE "_knex_temp_alter245" RENAME TO "order_item";');
    this.addSql('CREATE INDEX `order_item_order_order_id_index` on `order_item` (`order_order_id`);');
    this.addSql('CREATE INDEX `order_item_meal_id_index` on `order_item` (`meal_id`);');
    this.addSql('PRAGMA foreign_keys = ON;');
  }

}
