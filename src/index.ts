/**
 * The char-codes in this array are in the niqqud range but aren't niqqud, so
 * they are excluded from {@link char_code_is_niqqud}.
 */
const NOT_NIQQUD_IN_NIQQUD_RANGE: readonly number[] = [
	// The following are kept because they are not a vowel, they are...
    0x05be, // Maqaf (a word connector)
    0x05c0, // Paseq (a punctuation similar to a comma)
    0x05c3, // Sof Pasuq (a punctuation similar to a period)
    0x05c6, // Nun Hafukha (a glyph)
];

/**
 * @returns true if the given character code is a niqqud (vowel diacritic) character.
 */
export function char_code_is_niqqud(char_code: number): boolean {
    return (0x05b0 <= char_code &&
        char_code <= 0x05c7 &&
        !NOT_NIQQUD_IN_NIQQUD_RANGE.includes(char_code));
}

/**
 * @returns true if the given character code is a ta'am (cantillation diacritic) character.
 */
export function is_taam_code(char_chode: number): boolean {
    return 0x0591 <= char_chode && char_chode <= 0x05af;
}

/**
 * @returns true if the given character code is a diacritic character (either
 * niqqud or cantillation).
 */
export function is_diacritic_code(char_code: number): boolean {
    return char_code_is_niqqud(char_code) || is_taam_code(char_code);
}

/**
 * @returns true if the given character is a diacritic character (either niqqud or cantillation).
 */
export function char_diacritic(char_code: string): boolean {
    return is_diacritic_code(char_code.charCodeAt(0));
}

/**
 * @returns true if the given character is a niqqud (vowel diacritic) character.
 */
export function char_niqqud(char_code: string): boolean {
    return char_code_is_niqqud(char_code.charCodeAt(0));
}

/**
 * @returns true if the given character is a ta'am (cantillation diacritic) character.
 */
export function char_taam(char_code: string): boolean {
    return is_taam_code(char_code.charCodeAt(0));
}

/**
 * Removes diacritics from the given string.
 * @param input The input string.
 * @param type The type of diacritics to remove. Must be one of:
 * - {@link char_diacritic}: removes all diacritics (default).
 * - {@link char_niqqud}: removes all niqqud diacritics.
 * - {@link char_taam}: removes all ta'am diacritics.
 * @returns The input string with the desired diacritics removed.
 */
export function remove_diacritics(
	input: string,
	type: (charCode: string) => boolean = char_diacritic
): string {
	return [...input].filter(char => !type(char)).join("");
}
