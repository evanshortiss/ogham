import * as ogham from '../src/ogham';

describe('#convert', () => {
  it('should reject input containing characters not in [a-z] range', () => {
    expect(() => ogham.convert('Hey there 123 -')).toThrowError(
      /input can only contain alphabetic characters/gi
    );
  });

  it('should convert text and add head and tail characters', () => {
    expect(ogham.convert('eire')).toEqual('᚛ᚓᚔᚏᚓ᚜');
  });

  it('should convert text and not add head and tail characters', () => {
    expect(ogham.convert('eire', { addBoundary: false })).toEqual('ᚓᚔᚏᚓ');
  });

  it('should convert text without using forfeda characters and include head/tail', () => {
    expect(ogham.convert('is maith liom tae')).toEqual('᚛ᚔᚄ ᚋᚐᚔᚈᚆ ᚂᚔᚑᚋ ᚈᚐᚓ᚜');
  });

  it('should convert text using forfeda characters and include head/tail', () => {
    expect(ogham.convert('is maith liom tae', { useForfeda: true })).toEqual(
      '᚛ᚔᚄ ᚋᚐᚔᚈᚆ ᚂᚔᚑᚋ ᚈᚙ᚜'
    );
  });

  it('should convert text using forfeda characters and not include head/tail', () => {
    expect(
      ogham.convert('is maith liom tae', {
        useForfeda: true,
        addBoundary: false
      })
    ).toEqual('ᚔᚄ ᚋᚐᚔᚈᚆ ᚂᚔᚑᚋ ᚈᚙ');
  });

  it('should flag invalid characters', () => {
    expect(() => ogham.convert('keys')).toThrowError(
      'input cannot contain j, k, v, w, x, y unless "usePhonetics" option is passed'
    );
  });

  it('should convert string containing invalid characters with "usePhonetics"', () => {
    expect(ogham.convert('jkvwxy', { usePhonetics: true })).toEqual(
      '᚛ᚌᚊᚃᚒᚒᚎᚔ᚜'
    );
  });

  it('should convert string containing invalid characters with "usePhonetics"', () => {
    const input = 'abcdefghijklmnopqrstuvwxyz';
    const output = ogham.convert(input, {
      usePhonetics: true,
      addBoundary: false
    });

    // 'W' becomes 'UU' so it adds padding
    expect(output.length).toEqual(27);
    expect(output).toEqual('ᚐᚁᚉᚇᚓᚃᚌᚆᚔᚌᚊᚂᚋᚅᚑᚚᚊᚏᚄᚈᚒᚃᚒᚒᚎᚔᚎ');
  });

  it('should support passing an empty string', () => {
    expect(ogham.convert('')).toEqual('᚛᚜');
  });
});
