
// import { Buffer } from 'buffer'
import { fromHex, toHex, type Hex } from 'src/functions/hex'

const encoder = new TextEncoder()
const decoder = new TextDecoder()

// export const toUtf8 = (bytes: Uint8Array) => Buffer.from(bytes).toString()
// export const hexToUtf8 = (hex: string) => Buffer.from(hex, 'hex').toString()

export const toUtf8 = (data: Uint8Array | Hex) => {
   const bytes = typeof data === 'string' ? fromHex(data) : data
   return decoder.decode(bytes)
}

export const utf8ToBytes = (s: string) => encoder.encode(s)
export const utf8ToHex = (s: string) => toHex(utf8ToBytes(s))