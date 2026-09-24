#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/bc203171bdc6eaabd3c74c9cfd1fd4e3edee4872f838ae9b2c87ed4ad3fa4297/contract';
import endContract from '../../snapshots/bc203171bdc6eaabd3c74c9cfd1fd4e3edee4872f838ae9b2c87ed4ad3fa4297/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/f894f4f7aff8a0ca128bdebff027a779b00c3caee812eaa04dd82e170e31647a/contract';
import startContract from '../../snapshots/f894f4f7aff8a0ca128bdebff027a779b00c3caee812eaa04dd82e170e31647a/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [this.dropDefault({ schema: 'public', table: 'product', column: 'category' })];
  }
}

MigrationCLI.run(import.meta.url, M);
