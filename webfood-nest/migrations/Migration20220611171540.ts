import { Migration } from '@mikro-orm/migrations';

export class Migration20220611171540 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user_address` rename column `address_id` to `id`;');

    this.addSql('drop index `order_user_address_address_id_index`;');
    this.addSql('alter table `order` rename column `user_address_address_id` to `user_address_id`;');
    this.addSql('create index `order_user_address_id_index` on `order` (`user_address_id`);');
  }

}
