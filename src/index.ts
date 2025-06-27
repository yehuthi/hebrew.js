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

/**
 * Converts a character code from Hebrew script to Paleo-Hebrew script.
 *
 * This function is unchecked, meaning it assumes the character code belongs
 * to the Hebrew script, and otherwise returns an undefined value.
 */
export function char_code_to_paleo_unchecked(char_code: number): number {
	return char_code <= 0x05d9
		? char_code + 0x10330
		: char_code >= 0x05e6
		? char_code + 0x1032b
		: [
				0x1090a, 0x1090a, 0x1090b, 0x1090c, 0x1090c, 0x1090d, 0x1090d, 0x1090e,
				0x1090f, 0x10910, 0x10910, 0x10911,
		  ][char_code - 0x05da];
}

/**
 * Converts a character code from Hebrew script to Paleo-Hebrew script.
 *
 * If the character code is not in the Hebrew script, returns undefined.
 */
export function char_code_to_paleo(char_code: number): number | undefined {
	return 0x05d0 <= char_code && char_code <= 0x05ea
		? char_code_to_paleo_unchecked(char_code)
		: undefined;
}

/**
 * Converts the given character from Hebrew script to Paleo-Hebrew script.
 *
 * This function is unchecked, meaning it assumes the character belongs
 * to the Hebrew script, and otherwise returns an undefined value.
 */
export function char_to_paleo_unchecked(char: string): string {
	return String.fromCodePoint(char_code_to_paleo_unchecked(char.charCodeAt(0)));
}

/**
 * Converts a character from Hebrew script to Paleo-Hebrew script.
 *
 * If the character code is not in the Hebrew script, returns undefined.
 */
export function char_to_paleo(char: string): string | undefined {
	const paleoCode = char_code_to_paleo(char.charCodeAt(0));
	return paleoCode ? String.fromCodePoint(paleoCode) : undefined;
}

/** Replaces the Hebrew characters in a string to their Paleo-Hebrew equivalent. */
export function to_paleo(str: string): string {
	return [...str]
		.map(x => char_to_paleo(x) ?? x)
		.join("");
}