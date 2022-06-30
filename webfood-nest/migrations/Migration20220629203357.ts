import { Migration } from '@mikro-orm/migrations';

export class Migration20220629203357 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `request` add column `user_to_fire_id` integer null;');
  }

}
