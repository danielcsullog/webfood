import { Migration } from '@mikro-orm/migrations';

export class Migration20220614105618 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` integer not null primary key autoincrement, `name` varchar not null, `user_name` varchar not null, `password` varchar not null, `role` varchar not null);');
    this.addSql('create unique index `user_user_name_unique` on `user` (`user_name`);');

    this.addSql('create table `user_address` (`id` integer not null primary key autoincrement, `zip_code` integer not null, `city` varchar not null, `street` varchar not null, `house_number` integer not null, `staircase` integer not null, `doorbell` integer not null, `floor` integer not null, `door_number` integer not null, `note` varchar not null);');

    this.addSql('create table `meal` (`id` integer not null primary key autoincrement, `name` varchar not null, `price` integer not null, `description` varchar not null, `category` varchar not null, `is_vegan` integer not null, `is_spicy` integer not null, `is_vegetarian` integer not null, `is_lactose_free` integer not null, `is_gluten_free` integer not null, `is_sugar_free` integer not null);');
    this.addSql('create unique index `meal_name_unique` on `meal` (`name`);');

    this.addSql('create table `restaurant` (`id` integer not null primary key autoincrement, `name` varchar not null, `description` varchar not null, `price_category` integer not null, `category` varchar not null, `address` varchar not null, `opening_hours` text not null, `phone_number` varchar not null);');
    this.addSql('create unique index `restaurant_name_unique` on `restaurant` (`name`);');

    this.addSql('create table `meal_restaurants` (`meal_id` integer not null, `restaurant_id` integer not null, primary key (`meal_id`, `restaurant_id`));');
    this.addSql('create index `meal_restaurants_meal_id_index` on `meal_restaurants` (`meal_id`);');
    this.addSql('create index `meal_restaurants_restaurant_id_index` on `meal_restaurants` (`restaurant_id`);');

    this.addSql('create table `order` (`order_id` integer not null primary key autoincrement, `order_date` datetime not null, `order_status` varchar not null);');

    this.addSql('create table `order_item` (`id` integer not null primary key autoincrement, `amount` integer not null default 1);');

    this.addSql('alter table `user_address` add column `user_id` integer null;');
    this.addSql('create index `user_address_user_id_index` on `user_address` (`user_id`);');

    this.addSql('alter table `order` add column `user_id` integer null;');
    this.addSql('alter table `order` add column `user_address_id` integer null;');
    this.addSql('alter table `order` add column `restaurant_id` integer null;');
    this.addSql('create index `order_user_id_index` on `order` (`user_id`);');
    this.addSql('create index `order_user_address_id_index` on `order` (`user_address_id`);');
    this.addSql('create index `order_restaurant_id_index` on `order` (`restaurant_id`);');

    this.addSql('alter table `order_item` add column `order_order_id` integer null;');
    this.addSql('alter table `order_item` add column `meal_id` integer null;');
    this.addSql('create index `order_item_order_order_id_index` on `order_item` (`order_order_id`);');
    this.addSql('create index `order_item_meal_id_index` on `order_item` (`meal_id`);');
  }

}
