import { Migration } from '@mikro-orm/migrations';

export class Migration20220627123525 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `order` add column `order_done_date` datetime null;');
  }

}
