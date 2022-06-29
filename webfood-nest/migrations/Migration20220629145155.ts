import { Migration } from '@mikro-orm/migrations';

export class Migration20220629145155 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `request` (`id` integer not null primary key autoincrement, `creation_date` datetime not null, `completion_date` datetime null, `type` varchar not null, `status` varchar not null, `text` varchar not null);');

    this.addSql('alter table `request` add column `user_id` integer null;');
    this.addSql('alter table `request` add column `restaurant_id` integer null;');
    this.addSql('create index `request_user_id_index` on `request` (`user_id`);');
    this.addSql('create index `request_restaurant_id_index` on `request` (`restaurant_id`);');
  }

}
