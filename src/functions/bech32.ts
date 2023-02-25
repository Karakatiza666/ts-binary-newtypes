// https://stackoverflow.com/questions/21683680/regex-to-match-bitcoin-addresses

export type Bech32 = string & {_opaque: typeof Bech32}

declare const Bech32: unique symbol

const cardanoBech32Regex = /^(addr1|addr_test1|stake1|stake_test1)[a-zA-HJ-NP-Z0-9]{53,98}$/
const bitcoinBech32Regex = /^\b((bc|tb)(0([ac-hj-np-z02-9]{39}|[ac-hj-np-z02-9]{59})|1[ac-hj-np-z02-9]{8,87})|([13]|[mn2])[a-km-zA-HJ-NP-Z1-9]{25,39})\b$/

export function assertCardanoBech32(address: string): asserts address is Bech32 {
   if (!cardanoBech32Regex.test(address)) {
      throw new Error('Not a Cardano bech32 address!')
   }
}

export function assertBitcoinBech32(address: string): asserts address is Bech32 {
   if (!bitcoinBech32Regex.test(address)) {
      throw new Error('Not a Bitcoin bech32 address!')
   }
}

export function makeCardanoBech32(address: string) {
      assertCardanoBech32(address)
   return address
}

export function makeBitcoinBech32(address: string) {
      assertBitcoinBech32(address)
   return address
}