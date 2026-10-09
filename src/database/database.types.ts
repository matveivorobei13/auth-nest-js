import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

// 1. Создаем фиктивный вызов (он не выполняется в рантайме), чтобы TS понял точный тип
const dbInstance = drizzle(null as any, { schema });

// 2. Экспортируем правильный тип инстанса
export type Database = typeof dbInstance;