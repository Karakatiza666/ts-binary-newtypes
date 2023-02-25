
// import BigNumber from 'bignumber.js'
// import { Buffer } from 'buffer'

export type Hex = string & {_opaque: typeof Hex}

declare const Hex: unique symbol


// Matches pairs of hex digits, with or without '0x', in upper and lower case
// Allows empty string
const hexRegex = /^(0x)?([0-9a-fA-F]{2})*$/
export function isHex(str: string): str is Hex {
   return hexRegex.test(str)
}
export function assertHex(hex: string): asserts hex is Hex {
   if (!hexRegex.test(hex)) {
      throw new Error(`Not a hex value! <${hex}>`)
   }
}

export function makeHex(hex: string) {
   assertHex(hex)
   return hex // trimHex(hex)
}

// export const toHex = (bytes: Uint8Array) => makeHex(Buffer.from(bytes).toString('hex'))
export const toHex = (bytes: Uint8Array) => Array.from(bytes).map(byte => byte.toString(16).padStart(2, '0')).join('') as Hex
// export const fromHex = (hex: Hex) => Buffer.from(hex, 'hex')
export const fromHex = (hex: Hex) => new Uint8Array(hex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) ?? [])

export const toWetHex = (hex: string) => hexIsWet(hex) ? hex : '0x' + hex
export const toDryHex = (hex: string) => makeHex(hexIsWet(hex) ? hex.slice(2) : hex)

// export const numToHex = (n: number) => {
//    const hex = new BigNumber(n).toString(16)
//    return makeHex(hex.padStart(Math.ceil(hex.length / 2) * 2, '0'))
// }
export const numToHex = (n: number) => {
   const hex = n.toString(16)
   return makeHex(hex.padStart(Math.ceil(hex.length / 2) * 2, '0'))
}
// export const numToHex = (n: number) => {
//    const hex = BigInt(n).toString(16)
//    return makeHex(hex.padStart(Math.ceil(hex.length / 2) * 2, '0'))
// }

export const hexIsWet = (hex: string) => hex.indexOf('0x') === 0
// Trims lead zero pairs '00' from hex string
export const trimHex = <T extends string>(hex: T) => hexIsWet(hex)
    ? hex.replace(/^(0x)0+((\w{2})+)$/, "$1$2") as T
    : hex.replace(/^0+((\w{2})+)$/, "$1") as T

export function compareHex(a: Hex, b: Hex): number {
   const padLength = Math.max(a.length, b.length);
   const paddedA = a.padStart(padLength, '0');
   const paddedB = b.padStart(padLength, '0');

   for (let i = 0; i < padLength; i++) {
      if (paddedA.charCodeAt(i) < paddedB.charCodeAt(i)) return -1;
      if (paddedA.charCodeAt(i) > paddedB.charCodeAt(i)) return 1;
   }
   return 0;
}