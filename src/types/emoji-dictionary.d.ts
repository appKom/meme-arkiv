declare module "emoji-dictionary" {
  /**
   * Gets the Unicode emoji character for the given emoji name.
   * @param name The name of the emoji (e.g., 'smile', 'heart').
   * @returns The Unicode emoji character or undefined if not found.
   */
  export function getUnicode(name: string): string | undefined;

  /**
   * Gets the name of the emoji for the given Unicode character.
   * @param unicode The Unicode emoji character.
   * @returns The name of the emoji or undefined if not found.
   */
  export function getName(unicode: string): string | undefined;

  /**
   * Returns an array of all available emoji names.
   */
  export const names: string[];

  /**
   * Returns an array of all available Unicode emoji characters.
   */
  export const emojis: string[];
}
