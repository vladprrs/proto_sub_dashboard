# Deployment Guide

## Vercel Deployment

This project is configured for deployment on Vercel with the following settings:

### Configuration Files

- **`vercel.json`** - Vercel deployment configuration
- **`.nvmrc`** - Node.js version specification (18.x)
- **`package.json`** - Build scripts and dependencies

### Build Process

1. **Install Dependencies**: `npm install`
2. **TypeScript Check**: `tsc --noEmit`
3. **Vite Build**: `vite build`
4. **Output**: `dist/` directory

### Environment Requirements

- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0
- **TypeScript**: ~4.9.5

### Troubleshooting

If you encounter build issues:

1. **Run verification**: `npm run verify`
2. **Check TypeScript config**: Ensure `moduleResolution: "node"` in both `tsconfig.json` and `tsconfig.node.json`
3. **Clear cache**: Delete `node_modules` and `package-lock.json`, then run `npm install`

### Build Output

The build generates optimized assets in the `dist/` directory:
- HTML entry point
- CSS bundle (18KB gzipped)
- JavaScript chunks (vendor, router, utils, etc.)
- Source maps for debugging

### Performance

- **Total bundle size**: ~156KB (51KB gzipped)
- **Code splitting**: Automatic chunking for better caching
- **Tree shaking**: Unused code is eliminated
- **Minification**: All assets are minified for production 