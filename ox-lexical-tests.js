// Tests for Oxen Lexical Rules
import ohm from 'ohm-js';
import chai from 'chai';
import fs from 'fs';
const assert = chai.assert;
const grammar = ohm.grammar(fs.readFileSync("./grammar.ohm"));

const upperVowels = [
    "A",
    "E",
    "I",
    "O",
    "U"
];
const lowerVowels = upperVowels.map(vowel => { return vowel.toLowerCase()});

describe("Basic Oxen Lex Tests", () => {
    describe("Little Ox Short", () => {
        lowerVowels.forEach(lowerVowel => {
            let rightName = `x${lowerVowel}`;
            let leftName = `${lowerVowel}x`;
            it(`Can parse ${rightName}`, () => {
                let match = grammar.match(rightName, 'littleOxShort');
                assert.isTrue(match.succeeded());
            });
            it(`Can parse ${leftName}`, () => {
                let match = grammar.match(leftName, 'littleOxShort');
                assert.isTrue(match.succeeded());
            });
        });
    });
    describe("Big Ox Short", () => {
        upperVowels.forEach(upperVowel => {
            let rightName = `X${upperVowel}`;
            let leftName = `${upperVowel}X`;
            it(`Can parse ${rightName}`, () => {
                let match = grammar.match(rightName, 'bigOxShort');
                assert.isTrue(match.succeeded());
            });
            it(`Can parse ${leftName}`, () => {
                let match = grammar.match(leftName, 'bigOxShort');
                assert.isTrue(match.succeeded());
            });
        });
    });
    describe("Little Ox Long", () => {
        lowerVowels.forEach(prefix => {
            lowerVowels.forEach(suffix => {
                let name = `${prefix}x${suffix}`;
                it(`Can parse ${name}`, () => {
                    let match = grammar.match(name, 'littleOxLong');
                    assert.isTrue(match.succeeded());
                });
            });
        });
    });
    describe("Big Ox Long", () => {
        upperVowels.forEach(prefix => {
            upperVowels.forEach(suffix => {
                let name = `${prefix}X${suffix}`;
                it(`Can parse ${name}`, () => {
                    let match = grammar.match(name, 'bigOxLong');
                    assert.isTrue(match.succeeded());
                });
            });
        });
    });
    describe("Big Ox with Number", () => {
        it("Can parse OX24", () => {
            let match = grammar.match("OX24", "ox");
            assert.isTrue(match.succeeded());
        });
        it("Can parse XO3", () => {
            let match = grammar.match("XO3", "ox");
            assert.isTrue(match.succeeded());
        });
        it("Can parse OXO8", () => {
            let match = grammar.match("OXO8", "ox");
            assert.isTrue(match.succeeded());
        });
        it("Rejects incorrect digit: OXO1", () => {
            let match = grammar.match("OXO1", "ox");
            assert.isTrue(match.failed());
        });
    });
    describe("Little Ox with Number", () => {
        it("Can parse ox24", () => {
            let match = grammar.match("ox24", "ox");
            assert.isTrue(match.succeeded());
        });
        it("Can parse xo3", () => {
            let match = grammar.match("xo3", "ox");
            assert.isTrue(match.succeeded());
        });
        it("Can parse oxo8", () => {
            let match = grammar.match("oxo8", "ox");
            assert.isTrue(match.succeeded());
        });
        it("Rejects incorrect digit: oxo1", () => {
            let match = grammar.match("oxo1", "ox");
            assert.isTrue(match.failed());
        });
    });
    describe("Clinical Little Ox", () => {
        it("Can parse basic non-numeric little ox N3<xi>", () => {
            let name = "N3<xi>";
            let match = grammar.match(name, "oxName");
            assert.isTrue(match.succeeded());
        });
        it("Can parse basic numeric little ox N3<xi2>", () => {
            let name = "N3<xi>";
            let match = grammar.match(name, "oxName");
            assert.isTrue(match.succeeded());
        });
    });
    describe("Clinical Big Ox", () => {
        it("Can parse basic non-numeric big ox N55<AXE>", () => {
            let name = "N55<AXE>";
            let match = grammar.match(name, "oxName");
            assert.isTrue(match.succeeded());
        });
        it("Can parse basic numeric big ox N55<AXE>", () => {
            let name = "N55<AXE7>";
            let match = grammar.match(name, "oxName");
            assert.isTrue(match.succeeded());
        });
    });
    describe("Family Names", () => {
        let good = [
            "xu-OXO5-EX",
            "ixe33-XO-XO-OX-xe-xe2",
            "EXE-EXE3"
        ];
        let bad = [
            "xu- OXO5-EX", // Has a space
        ];
        good.forEach(goodName => {
            it(`Can parse ${goodName}`, () => {
                let match = grammar.match(goodName, 'oxFamilyName');
                assert.isTrue(match.succeeded());
            });
        });
        bad.forEach(badName => {
            it(`Rejects ${badName}`, () => {
                let match = grammar.match(badName, "oxFamilyName");
                assert.isTrue(match.failed());
            });
        });
    });
    describe("Compound Names", () => {
        describe("Family Names with Clinical Members", () => {
            let good = [
                "ux2-N4<EXI>-N8<xo>",
                "N2<XU>-oxe3-XU2",
                "N4<xa>-N9<XA2>"
            ];
            let bad = [
                "ux2-N4(EXI)-N8(xo)",
                "N2<XU> - oxe3-XU2",
                "N2<XU>3-oxo2"
            ];
            good.forEach(goodName => {
                it(`Can parse ${goodName}`, () => {
                    let match = grammar.match(goodName, "oxName");
                    assert.isTrue(match.succeeded());
                });
            });
            bad.forEach(badName => {
                it(`Rejects ${badName}`, () => {
                    let match = grammar.match(badName, "oxName");
                    assert.isTrue(match.failed());
                });
            });
        });
        describe("Clinical Names with Family Members, etc", () => {
            let good = [
                "N4<IXA2-oxe-xi-ex4-EXE>",
                "N1<EXE-oxo>-N7<exi2-IX-XI-OX5>"
            ];
            let bad = [
                "N4<IXA2-oxe-xi-ex4-EXE>5"
            ];
            good.forEach(goodName => {
                it(`Can parse ${goodName}`, () => {
                    let match = grammar.match(goodName, "oxName");
                    assert.isTrue(match.succeeded());
                });
            });
        });
    });
});
