import { Migration } from '@mikro-orm/migrations';

export class Migration20220614115521 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop index `meal_restaurant_id_index`;');
    this.addSql('PRAGMA table_info(`meal`);');

    this.addSql('create table `meal_restaurants` (`meal_id` integer not null, `restaurant_id` integer not null, primary key (`meal_id`, `restaurant_id`));');
    this.addSql('create index `meal_restaurants_meal_id_index` on `meal_restaurants` (`meal_id`);');
    this.addSql('create index `meal_restaurants_restaurant_id_index` on `meal_restaurants` (`restaurant_id`);');
  }

}
