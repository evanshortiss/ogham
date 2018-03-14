// Our mapping of alphabetical characters to ogham
import ogham from './ogham-symbols';

// Inputs can only contain alphabetical characters and spaces
const validateInputRgx = /[a-z ]+$/g;

// These characters are not supported by default
const phoneticReplacements = [
  {
    original: 'j',
    replacement: 'g'
  },
  {
    original: 'k',
    replacement: 'q'
  },
  {
    original: 'v',
    replacement: 'f'
  },
  {
    original: 'w',
    replacement: 'uu'
  },
  {
    original: 'x',
    replacement: 'z'
  },
  {
    original: 'y',
    replacement: 'i'
  }
];

/**
 * Interface representing options that can be passed to the convert
 */
export interface OghamOptions {
  addBoundary?: boolean;
  useForfeda?: boolean;
  usePhonetics?: boolean;
}

/**
 * Given an input of latin characters and spaces, this will return a string
 * containing the corresponding ogham characters, e.g "eire" => "᚛ᚓᚔᚏᚓ᚜"
 * @param text
 * @param headAndTail
 */
export function convert(input: string, opts?: OghamOptions) {
  const options: OghamOptions = Object.assign(
    {
      addBoundary: true
    },
    opts
  );

  let text = input.toLowerCase();

  if (text.length !== 0 && !text.match(validateInputRgx)) {
    throw new Error('input can only contain alphabetic characters');
  }

  if (!options.usePhonetics && containsInvalidCharacters(text)) {
    throw new Error(
      `input cannot contain ${phoneticReplacements
        .map(ch => ch.original)
        .join(', ')} unless "usePhonetics" option is passed`
    );
  }

  if (options.useForfeda) {
    text = replaceCharacters(text, ogham.combination);
  }

  if (options.usePhonetics) {
    text = replaceInvalidCharactersWithPhonetics(text);
  }

  if (options.addBoundary) {
    text = `${ogham.head.char}${text}${ogham.tail.char}`;
  }

  return replaceCharacters(text, ogham.individual);
}

/**
 * Replaces occurences of invalid characters with phonetics equivalents
 * @param text
 */
function replaceInvalidCharactersWithPhonetics(text: string) {
  phoneticReplacements.forEach(ch => {
    text = text.replace(new RegExp(ch.original, 'gi'), ch.replacement);
  });

  return text;
}

/**
 * Determines if the given input contains letters that are missing from ogham
 * or the irish alphabet
 * @param text
 */
function containsInvalidCharacters(text: string) {
  for (let i = 0; i < phoneticReplacements.length; i++) {
    if (text.indexOf(phoneticReplacements[i].original) !== -1) {
      return true;
    }
  }

  return false;
}

/**
 * Replaces characters that match ogham forfeda patterns, e.g "ng" becomes "ᚍ"
 * @param text
 */
function replaceCharacters(text: string, patterns: any) {
  Object.keys(patterns).forEach(letter => {
    // This is the object containing the ogham char and char code
    const charInfo = patterns[letter];
    const rgx = new RegExp(`${letter}`, 'ig');

    text = text.replace(rgx, charInfo.char);
  });

  return text;
}
