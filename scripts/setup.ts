#!/usr/bin/env bun

/**
 * Setup script for YouTube Clone
 * Run: bun run scripts/setup.ts
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();

console.log('🚀 Setting up YouTube Clone...\n');

// 1. Create .env if not exists
if (!existsSync(join(ROOT, '.env'))) {
  writeFileSync(join(ROOT, '.env'), 'DATABASE_URL=file:./db/custom.db\n');
  console.log('✅ Created .env');
} else {
  console.log('✅ .env already exists');
}

// 2. Create db directory if not exists
if (!existsSync(join(ROOT, 'db'))) {
  mkdirSync(join(ROOT, 'db'));
  console.log('✅ Created db/ directory');
}

// 3. Generate Prisma client
console.log('\n📦 Generating Prisma client...');
try {
  execSync('npx prisma generate', { stdio: 'inherit', cwd: ROOT });
  console.log('✅ Prisma client generated');
} catch {
  console.log('⚠️  Prisma generate failed, continuing...');
}

// 4. Push schema to database
console.log('\n💾 Pushing schema to database...');
try {
  execSync('npx prisma db push', { stdio: 'inherit', cwd: ROOT });
  console.log('✅ Database schema created');
} catch {
  console.log('⚠️  Schema push failed');
}

// 5. Seed the database
console.log('\n🌱 Seeding database with sample data...');
try {
  execSync('bun run src/lib/seed.ts', { stdio: 'inherit', cwd: ROOT });
} catch {
  console.log('⚠️  Seed failed');
}

console.log('\n✨ Setup complete! Run `bun run dev` to start the app.');
