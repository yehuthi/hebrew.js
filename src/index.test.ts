import { remove_diacritics, char_niqqud, char_taam } from "./index";

const GENESIS_1_1 = {
	full: "בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים אֵ֥ת הַשָּׁמַ֖יִם וְאֵ֥ת הָאָֽרֶץ׃\t׆",
	stripped: "בראשית ברא אלהים את השמים ואת הארץ׃\t׆",
	taam: "בראש֖ית בר֣א אלה֑ים א֥ת השמ֖ים וא֥ת הארץ׃\t׆",
	niqqud: "בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָֽרֶץ׃\t׆",
}

describe("remove_diacritics", () => {
	it("should remove niqqud and cantillation", () => {
		expect(remove_diacritics(GENESIS_1_1.full)).toBe(GENESIS_1_1.stripped);
	});
	it("should remove niqqud", () => {
		expect(remove_diacritics(GENESIS_1_1.full, char_niqqud)).toBe(GENESIS_1_1.taam);
	});
	it("should remove cantillation", () => {
		expect(remove_diacritics(GENESIS_1_1.full, char_taam)).toBe(GENESIS_1_1.niqqud);
	});
})