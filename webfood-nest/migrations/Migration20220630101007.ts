import { Migration } from '@mikro-orm/migrations';

export class Migration20220630101007 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `restaurant` add column `allowed` integer null;');
  }

}
