import { fromHex, makeHex, toHex } from "src/functions/hex"
import type { Hex } from "src/functions/hex"

// key [Hexed] makes type unique from Hex, type T makes Hexeds of different types unique
export type Hexed<T> = Hex & { [Hexed]: T }

declare const Hexed: unique symbol

export const mapFromHexed = <T>(c: { from_bytes: (bytes: Uint8Array) => T }) => (hexeds: Hexed<T>[]) =>
   hexeds.map(fromHexed(c))
export const fromHexed = <T>(c: { from_bytes: (bytes: Uint8Array) => T }) => (hexed: Hexed<T>) =>
   c.from_bytes(fromHex(hexed))
export const unsafeFromHexed = <T>(c: { from_bytes: (bytes: Uint8Array) => T }) => (hexed: string) =>
   c.from_bytes(fromHex(makeHex(hexed)))

export const toHexed = <T extends { to_bytes: () => Uint8Array }>(v: T) => unsafeToHexed<T>(v.to_bytes())
export const unsafeToHexed = <T>(b: Uint8Array) => toHex(b) as Hexed<T>