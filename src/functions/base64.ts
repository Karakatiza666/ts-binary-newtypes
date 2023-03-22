import { bytesToBase64, base64ToBytes } from 'byte-base64'

export type Base64 = string & {_opaque: typeof Base64}

declare const Base64: unique symbol

// https://stackoverflow.com/questions/475074/regex-to-parse-or-validate-base64-data
const base64regex = /^[+/0-9A-Za-z]+={0,2}$/

export const isBase64 = (str: string): str is Base64 => str.length % 4 === 0 && base64regex.test(str)
export function assertBase64(str: string): asserts str is Base64 {
   if (!isBase64(str)) {
      throw new Error('Not a base64 string!')
   }
}
export function makeBase64(str: string) {
   assertBase64(str)
   return str
}
export const fromBase64 = (base64: Base64) => base64ToBytes(base64)
export const toBase64 = (bytes: Uint8Array) => bytesToBase64(bytes) as Base64