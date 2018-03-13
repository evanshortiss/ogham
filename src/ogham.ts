// Our mapping of alphabetical characters to ogham
import ogham from "./ogham-symbols";

// Inputs can only contain alphabetical characters and spaces
const validateInputRgx = /^(?!.*[jwy])[a-z ]+$/;

/**
 * Interface representing options that can be passed to the convert
 */
export interface OghamOptions {
  addBoundary?: boolean;
  useForfeda?: boolean;
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

  if (!text.match(validateInputRgx)) {
    throw new Error(
      "Input can only contain alphabetic characters, excluding J, K, V, W, X,  and Y"
    );
  }

  if (options.useForfeda) {
    text = replaceCharacters(text, ogham.combination);
  }

  if (options.addBoundary) {
    text = `${ogham.head.char}${text}${ogham.tail.char}`;
  }

  return replaceCharacters(text, ogham.individual);
}

/**
 * Replaces characters that match ogham forfeda patterns, e.g "ng" becomes "ᚍ"
 * @param text
 */
function replaceCharacters(text: string, patterns: any) {
  Object.keys(patterns).forEach(letter => {
    // This is the object containing the ogham char and char code
    const charInfo = patterns[letter];
    const rgx = new RegExp(`${letter}`, "ig");

    text = text.replace(rgx, charInfo.char);
  });

  return text;
}
