#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/b7735e18006c6b1f5fece3082b71ce572e46dcef4f5aad96a5fdc8c70c795005/contract';
import startContract from '../../snapshots/b7735e18006c6b1f5fece3082b71ce572e46dcef4f5aad96a5fdc8c70c795005/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/f894f4f7aff8a0ca128bdebff027a779b00c3caee812eaa04dd82e170e31647a/contract';
import endContract from '../../snapshots/f894f4f7aff8a0ca128bdebff027a779b00c3caee812eaa04dd82e170e31647a/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'product',
        column: col('category', 'text', {
          notNull: true,
          default: lit(''),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
