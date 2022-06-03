import { Migration } from '@mikro-orm/migrations';

export class Migration20220603093307 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `order` (`order_id` integer not null primary key autoincrement, `order_date` text not null, `user_id` integer not null, `user_address` text not null, `ordered_item_ids` text not null, `is_completed` integer not null);');
  }

}
