import { Migration } from '@mikro-orm/migrations';

export class Migration20220629120759 extends Migration {

  async up(): Promise<void> {
    this.addSql('PRAGMA table_info(`request`);');
  }

}
