declare module "lightcookie" {
  export interface IParsedCookies {
    [key: string]: string | undefined;
  }
  /**
   * Parse a cookie string
   * @param {string} cookieString - A cookie string
   * @returns {Object} Interpreted cookie data as an Object
   */
  export function parse(cookieString: string): IParsedCookies;

  /**
   * Serialize an object to cookie format
   * @param {Object} cookieData - Object to serialize to cookie string
   * @returns {string} Cookie string
   */
  export function serialize(cookieData: IParsedCookies): string;
}
