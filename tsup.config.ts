import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  outDir: 'lib',
  clean: true,
  outExtension({ format }) {
    return format === 'cjs' ? { js: '.cjs.js' } : { js: '.mjs' };
  },
});
