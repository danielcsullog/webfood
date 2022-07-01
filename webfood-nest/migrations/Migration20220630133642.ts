import { Migration } from '@mikro-orm/migrations';

export class Migration20220630133642 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `meal` add column `restaurant_id` integer null;');
    this.addSql('create index `meal_restaurant_id_index` on `meal` (`restaurant_id`);');

    this.addSql('drop table if exists `meal_restaurants`;');
  }

}
