# Biskuvi

## Development
### 0 - Requirement(s)
[Bun](https://bun.sh) v1.1.33+ (or any tool that is compatible with package.json)

### 1 - Install dependencies:
```bash
bun install
```
### 2 - Load extension on Firefox / Chromium based browser:

1 - Open the browser's "Extensions" page (e.g.: chrome://extensions)  
2 - Toggle "Development Mode" (currently at top right of the "Extensions" page)  
3 - Click "Load unpacked" button -> select the repo  

### 3 - Build code and watch for development mode
```bash
bun run dev
```

## Packing extension

```bash
bun run pack
```
