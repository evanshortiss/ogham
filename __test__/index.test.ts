import * as ogham from "../src/ogham";

describe("#convert", () => {
  it("should reject input containing characters not in [a-z] range", () => {
    expect(() => {
      ogham.convert("Hey there 123 -");
    }).toThrowError(/input can only contain alphabetic characters/gi);
  });

  it("should convert text and add head and tail characters", () => {
    expect(ogham.convert("eire")).toEqual("᚛ᚓᚔᚏᚓ᚜");
  });

  it("should convert text and not add head and tail characters", () => {
    expect(ogham.convert("eire", { addBoundary: false })).toEqual("ᚓᚔᚏᚓ");
  });

  it("should convert text without using forfeda characters and include head/tail", () => {
    expect(ogham.convert("is maith liom tae")).toEqual("᚛ᚔᚄ ᚋᚐᚔᚈᚆ ᚂᚔᚑᚋ ᚈᚐᚓ᚜");
  });

  it("should convert text using forfeda characters and include head/tail", () => {
    expect(ogham.convert("is maith liom tae", { useForfeda: true })).toEqual(
      "᚛ᚔᚄ ᚋᚐᚔᚈᚆ ᚂᚔᚑᚋ ᚈᚙ᚜"
    );
  });

  it("should convert text using forfeda characters and not include head/tail", () => {
    expect(
      ogham.convert("is maith liom tae", {
        useForfeda: true,
        addBoundary: false
      })
    ).toEqual("ᚔᚄ ᚋᚐᚔᚈᚆ ᚂᚔᚑᚋ ᚈᚙ");
  });
});
