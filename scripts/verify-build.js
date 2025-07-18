#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Verifying build environment...');

// Check Node.js version
const nodeVersion = process.version;
console.log(`📦 Node.js version: ${nodeVersion}`);

// Check TypeScript version
try {
  const tscVersion = execSync('npx tsc --version', { encoding: 'utf8' });
  console.log(`🔧 TypeScript version: ${tscVersion.trim()}`);
} catch (error) {
  console.error('❌ TypeScript not found or error:', error.message);
}

// Check if tsconfig files exist
const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
const tsconfigNodePath = path.join(process.cwd(), 'tsconfig.node.json');

if (fs.existsSync(tsconfigPath)) {
  console.log('✅ tsconfig.json exists');
  const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
  console.log('📋 tsconfig.json moduleResolution:', tsconfig.compilerOptions?.moduleResolution);
} else {
  console.error('❌ tsconfig.json not found');
}

if (fs.existsSync(tsconfigNodePath)) {
  console.log('✅ tsconfig.node.json exists');
  const tsconfigNode = JSON.parse(fs.readFileSync(tsconfigNodePath, 'utf8'));
  console.log('📋 tsconfig.node.json moduleResolution:', tsconfigNode.compilerOptions?.moduleResolution);
} else {
  console.error('❌ tsconfig.node.json not found');
}

// Check package.json
const packagePath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  console.log('📦 TypeScript version in package.json:', packageJson.devDependencies?.typescript);
}

console.log('✅ Build environment verification complete'); 