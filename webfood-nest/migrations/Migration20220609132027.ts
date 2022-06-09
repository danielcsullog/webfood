import { Migration } from '@mikro-orm/migrations';

export class Migration20220609132027 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `meal` (`id` integer not null primary key autoincrement, `name` text not null, `price` integer not null, `description` text not null, `category` text not null, `is_vegan` integer not null, `is_spicy` integer not null, `is_vegetarian` integer not null, `is_lactose_free` integer not null, `is_gluten_free` integer not null, `is_sugar_free` integer not null);');
    this.addSql('create unique index `meal_name_unique` on `meal` (`name`);');

    this.addSql('create table `restaurant` (`id` integer not null primary key autoincrement, `name` text not null, `description` text not null, `price_category` integer not null, `category` integer not null, `address` text not null, `opening_hours` text not null, `phone_number` text not null);');
    this.addSql('create unique index `restaurant_name_unique` on `restaurant` (`name`);');

    this.addSql('create table `meal_restaurants` (`meal_id` integer not null, `restaurant_id` integer not null, constraint `meal_restaurants_meal_id_foreign` foreign key(`meal_id`) references `meal`(`id`) on delete cascade on update cascade, constraint `meal_restaurants_restaurant_id_foreign` foreign key(`restaurant_id`) references `restaurant`(`id`) on delete cascade on update cascade, primary key (`meal_id`, `restaurant_id`));');
    this.addSql('create index `meal_restaurants_meal_id_index` on `meal_restaurants` (`meal_id`);');
    this.addSql('create index `meal_restaurants_restaurant_id_index` on `meal_restaurants` (`restaurant_id`);');

    this.addSql('create table `order` (`order_id` integer not null primary key autoincrement, `order_date` datetime not null, `user_id` integer not null, `user_address` text not null, `order_status` integer not null, `restaurant_id` integer not null, constraint `order_restaurant_id_foreign` foreign key(`restaurant_id`) references `restaurant`(`id`) on update cascade);');
    this.addSql('create index `order_restaurant_id_index` on `order` (`restaurant_id`);');

    this.addSql('create table `order_item` (`id` integer not null primary key autoincrement, `order_order_id` integer not null, `meal_id` integer not null, `amount` integer not null default 1, constraint `order_item_order_order_id_foreign` foreign key(`order_order_id`) references `order`(`order_id`) on update cascade, constraint `order_item_meal_id_foreign` foreign key(`meal_id`) references `meal`(`id`) on update cascade);');
    this.addSql('create index `order_item_order_order_id_index` on `order_item` (`order_order_id`);');
    this.addSql('create index `order_item_meal_id_index` on `order_item` (`meal_id`);');
  }

}