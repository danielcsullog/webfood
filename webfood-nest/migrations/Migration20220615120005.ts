import { Migration } from '@mikro-orm/migrations';

export class Migration20220615120005 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `restaurant` add column `owner_id` integer null;');
    this.addSql('create index `restaurant_owner_id_index` on `restaurant` (`owner_id`);');

    this.addSql('create table `restaurant_workers` (`restaurant_id` integer not null, `user_id` integer not null, primary key (`restaurant_id`, `user_id`));');
    this.addSql('create index `restaurant_workers_restaurant_id_index` on `restaurant_workers` (`restaurant_id`);');
    this.addSql('create index `restaurant_workers_user_id_index` on `restaurant_workers` (`user_id`);');
  }

}
