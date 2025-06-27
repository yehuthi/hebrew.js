# hebrew.js 📜

A JavaScript/TypeScript library for Hebrew text processing and manipulation. This library provides utilities for working with Hebrew diacritics (niqqud and cantillation marks / te'amim) and converting between Hebrew and Paleo-Hebrew scripts.

## ✨ Features

- **🔍 Diacritic Identification / Removal**: Identify or strip diacritics from Hebrew text.
- **🔄 Script Conversion**: Convert Hebrew text to Paleo-Hebrew script
- **📘 TypeScript Support**: Full TypeScript definitions included
- **⚡ Zero Dependencies**: Lightweight with no external dependencies
- **📦 Multiple Module Formats**: Supports CommonJS, ES modules, and UMD

## 📦 Installation

```bash
npm install @yehuthi/hebrew
```

Or using pnpm:

```bash
pnpm add @yehuthi/hebrew
```

## 🚀 Usage

### 📥 Basic Import

```javascript
import * as hebrew from '@yehuthi/hebrew';
```

### 🧹 Removing Diacritics

The library can remove different types of diacritics from Hebrew text:

```javascript
// Sample Hebrew text with full diacritics
const hebrewText = "בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים אֵ֥ת הַשָּׁמַ֖יִם וְאֵ֥ת הָאָֽרֶץ׃";

// Remove all diacritics (niqqud and cantillation)
const stripped = hebrew.remove_diacritics(hebrewText);
// Result: "בראשית ברא אלהים את השמים ואת הארץ׃"

// Remove only niqqud (vowel diacritics)
const withoutNiqqud = hebrew.remove_diacritics(hebrewText, hebrew.char_niqqud);
// Result: "בראש֖ית בר֣א אלה֑ים א֥ת השמ֖ים וא֥ת הארץ׃"

// Remove only cantillation marks
const withoutCantillation = hebrew.remove_diacritics(hebrewText, hebrew.char_taam);
// Result: "בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָֽרֶץ׃"
```

### 🏺 Converting to Paleo-Hebrew

Convert modern Hebrew text to Paleo-Hebrew script:

```javascript
const modernHebrew = "בראשית ברא אלהים את השמים ואת הארץ";
const paleoHebrew = hebrew.to_paleo(modernHebrew);
// Result: "𐤁𐤓𐤀𐤔𐤉𐤕 𐤁𐤓𐤀 𐤀𐤋𐤄𐤉𐤌 𐤀𐤕 𐤄𐤔𐤌𐤉𐤌 𐤅𐤀𐤕 𐤄𐤀𐤓𐤑"
```

### 🔤 Character-Level Functions

Check individual characters for diacritics:

```javascript
import * as hebrew from '@yehuthi/hebrew';

// Check if a character is a niqqud
hebrew.char_niqqud('ָ'); // true
hebrew.char_niqqud('א'); // false

// Check if a character is a cantillation mark
hebrew.char_taam('֖'); // true
hebrew.char_taam('א'); // false

// Check if a character is any type of diacritic
hebrew.char_diacritic('ָ'); // true
hebrew.char_diacritic('֖'); // true
hebrew.char_diacritic('א'); // false
```

## 📚 API Reference

### 🔧 Core Functions

#### `remove_diacritics(input: string, type?: function): string`
Removes diacritics from Hebrew text.

- **Parameters:**
  - `input`: The Hebrew text to process
  - `type`: Optional function to determine which diacritics to remove (defaults to removing all diacritics)
- **Returns:** String with specified diacritics removed

#### `to_paleo(str: string): string`
Converts Hebrew text to Paleo-Hebrew script.

- **Parameters:**
  - `str`: Hebrew text to convert
- **Returns:** Text converted to Paleo-Hebrew script

### 🔍 Character Detection Functions

#### `char_niqqud(char: string): boolean`
Checks if a character is a niqqud (vowel diacritic).

#### `char_taam(char: string): boolean`
Checks if a character is a cantillation mark (ta'am).

#### `char_diacritic(char: string): boolean`
Checks if a character is any type of diacritic (niqqud or cantillation).

### 🔢 Character Code Functions

#### `char_code_is_niqqud(charCode: number): boolean`
Checks if a character code represents a niqqud.

#### `is_taam_code(charCode: number): boolean`
Checks if a character code represents a cantillation mark.

#### `is_diacritic_code(charCode: number): boolean`
Checks if a character code represents any type of diacritic.

### 🏺 Paleo-Hebrew Conversion Functions

#### `char_to_paleo(char: string): string | undefined`
Converts a single Hebrew character to Paleo-Hebrew.

#### `char_to_paleo_unchecked(char: string): string`
Converts a single Hebrew character to Paleo-Hebrew (unchecked version).

#### `char_code_to_paleo(charCode: number): number | undefined`
Converts a Hebrew character code to Paleo-Hebrew character code.

#### `char_code_to_paleo_unchecked(charCode: number): number`
Converts a Hebrew character code to Paleo-Hebrew character code (unchecked version).

## 💡 Examples

### 📖 Processing Biblical Text

```javascript
import * as hebrew from '@yehuthi/hebrew';

// Genesis 1:1 with full diacritics
const genesis1_1 = "בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים אֵ֥ת הַשָּׁמַ֖יִם וְאֵ֥ת הָאָֽרֶץ׃";

// Remove all diacritics for plain text
const plainText = hebrew.remove_diacritics(genesis1_1);
console.log(plainText); // "בראשית ברא אלהים את השמים ואת הארץ׃"

// Convert to Paleo-Hebrew
const paleoText = hebrew.to_paleo(plainText);
console.log(paleoText); // "𐤁𐤓𐤀𐤔𐤉𐤕 𐤁𐤓𐤀 𐤀𐤋𐤄𐤉𐤌 𐤀𐤕 𐤄𐤔𐤌𐤉𐤌 𐤅𐤀𐤕 𐤄𐤀𐤓𐤑׃"
```

### 📊 Text Analysis

```javascript
import * as hebrew from '@yehuthi/hebrew';

function analyzeHebrewText(text) {
    const chars = [...text];
    const niqqudCount = chars.filter(hebrew.char_niqqud).length;
    const taamCount = chars.filter(hebrew.char_taam).length;
    const totalDiacritics = chars.filter(hebrew.char_diacritic).length;
    
    return {
        totalCharacters: chars.length,
        niqqudCount,
        taamCount,
        totalDiacritics,
        plainTextRatio: (chars.length - totalDiacritics) / chars.length
    };
}

const analysis = analyzeHebrewText("בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים");
console.log(analysis);
```

## 🛠️ Development

### 🔨 Building

```bash
pnpm build
```

### 🧪 Testing

```bash
pnpm test
```

### 📁 Project Structure

- `src/index.ts` - Main library code
- `src/index.test.ts` - Test suite
- `dist/` - Built distribution files (CommonJS, ES modules, UMD)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🏷️ Keywords

Hebrew, alphabet, script, letters, phoenician, niqqud, taamim, diacritics, paleo-hebrew, text processing
