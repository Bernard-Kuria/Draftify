# Draftify

Draftify is a lightweight, modular TypeScript library for creating, modifying, validating, normalizing, and exporting structured documents in the browser or Node.js. It consists of two main layers:

- **draftify-core**: Core logic for document blocks, including creators, modifiers, validators, normalizers, and block registry.
- **draftify-lib**: Utility functions for handling clipboard operations, JSON download, DOCX export, and media handling.

Draftify is designed for flexibility, scalability, and integration with React or other frameworks. It’s ideal for building rich text editors, document processors, or content-heavy applications.

---

## Quick Start
[![npm](https://img.shields.io/npm/v/draftify-react)](https://www.npmjs.com/package/draftify-react)

```ts
import Draftify from "draftify";

// Create a simple document
const blocks = [
  Draftify.createHeadingBlock("Hello World"),
  Draftify.createParagraphBlock("This is a sample paragraph."),
];

// Normalize and export
const normalized = Draftify.normalizeDocument({ metadata: {}, blocks });
Draftify.exportBlocksToDocx(normalized);
```

> In just a few lines, you can create, normalize, and export a document. Mix in other creators, modifiers, validators, or utilities as needed.

---

## Installation

```bash
npm install draftify
# or
yarn add draftify
```

---

## Features

### Creators (draftify-core)

Easily generate new document blocks:

- `createHeadingBlock(content?: string, level?: number)`
- `createSubheadingBlock(content?: string)`
- `createParagraphBlock(content?: string)`
- `createQuoteBlock(content?: string, author?: string)`
- `createListBlock(items?: string[], style?: "ordered" | "unordered")`
- `createTableBlock(content?: string[][])`
- `createImageBlock(src?: string, alt?: string, caption?: string)`
- `createVideoBlock(src?: string, provider?: string)`
- `createLinkBlock(linkText?: string, url?: string)`
- `createCodeBlock(code?: string, language?: string)`

### Modifiers (draftify-core)

Modify existing blocks:

- `modifyHeadingBlock(blocks, id, newContent, level)`
- `modifyParagraphBlock(blocks, id, newContent)`
- `modifyQuoteBlock(blocks, id, newContent, author)`
- `modifyListBlock(blocks, id, style, items)`
- `modifyTableBlock(blocks, id, tableContent)`
- `modifyImageBlock(blocks, id, src, alt, caption)`
- `modifyVideoBlock(blocks, id, src, provider)`
- `modifyLinkBlock(blocks, id, linkText, url)`
- `modifyCodeBlock(blocks, id, language, code)`

### Validators (draftify-core)

Ensure document and block integrity:

- `validateBlock(block)`
- `validateDocument(doc)`
- Types definitions for stricter type checks: `Block`, `Document`, `Metadata`, etc.

### Normalizers (draftify-core)

Prepare documents for export or storage:

- `normalizeBlock(block)`
- `normalizeDocument(doc)`

### Registry (draftify-core)

Optional advanced feature for custom blocks:

- `blockRegistry`: Add, remove, or fetch custom block types dynamically.

---

### Utilities (draftify-lib)

- `imageToBase64(block)`: Convert an image block’s file to a base64 string.
- `handleCopy(content)`: Copy any content to the clipboard.
- `handleDownloadJSON(doc)`: Download document as JSON.
- `exportBlocksToDocx(doc)`: Export blocks to a DOCX file.
- `convertBlocksToHTML(blocks)`: Convert blocks to HTML representation.

---

## Usage Example

```ts
import Draftify from "draftify";

// Step 1: Create blocks
const blocks = [
  Draftify.createHeadingBlock("Draftify Example"),
  Draftify.createParagraphBlock("Built using Draftify-core and Draftify-lib."),
];

// Step 2: Modify a block
Draftify.modifyParagraphBlock(blocks, blocks[1].id, "Updated content!");

// Step 3: Validate
const isValid = Draftify.validateDocument({ metadata: {}, blocks });

// Step 4: Normalize
const normalized = Draftify.normalizeDocument({ metadata: {}, blocks });

// Step 5: Export
Draftify.exportBlocksToDocx(normalized);
```

---

## Project Structure

```
draftify/
├─ src/
│  ├─ draftify-core/
│  │  ├─ creators/
│  │  ├─ modifiers/
│  │  ├─ validators/
│  │  ├─ normalizers/
│  │  └─ registry/
│  └─ draftify-lib/
│     ├─ copyToClipboard.ts
│     ├─ downloadJSON.ts
│     └─ exportToDocx.ts
├─ dist/
├─ index.ts
├─ package.json
└─ tsconfig.json
```

- `src/` – Source code, fully typed and modular.
- `dist/` – Compiled JS and type definitions ready for npm consumption.
- `index.ts` – Public API export entry point.
- `draftify-core/` – Core document logic.
- `draftify-lib/` – Utilities and helper functions.

---

## TypeScript Support

Draftify ships with TypeScript type declarations (`index.d.ts`) for all public functions and utilities. When using TypeScript, imports are fully typed:

```ts
import Draftify, { validateBlock } from "draftify";

const block = Draftify.createHeadingBlock("Hello TS!");
validateBlock(block);
```

---

## Contributing

We welcome contributions! To develop locally:

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

4. Run tests (if any) and make your changes.
5. Submit a PR with a detailed description.

---

## License

MIT © 2025 Draftify Team

---

Bernard Kuria Mechatronics Engineer • Developer • Creator of E-NEXUS, DigiSign, and Draftify 📍 Nyeri, Kenya 🌐 https://bernard-webfolio.web.app
