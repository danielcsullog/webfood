import { Migration } from '@mikro-orm/migrations';

export class Migration20220627171508 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `order` add column `comment` varchar null;');
  }

}
