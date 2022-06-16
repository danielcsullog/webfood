import { Migration } from '@mikro-orm/migrations';

export class Migration20220616150715 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `order` add column `short_address` varchar null;');
  }

}
