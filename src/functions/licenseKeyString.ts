// Base 34 used for license keys [1-9A-NP-Z]

import * as baseX from 'base-x'

export type LicenseKeyString = string & {_opaque: typeof LicenseKeyString}

declare const LicenseKeyString: unique symbol

const licenseKeyStringRegex = /^[1-9A-NP-Z]*$/

export const isLicenseKeyString = (str: string): str is LicenseKeyString => licenseKeyStringRegex.test(str)
export function assertLicenseKeyString(str: string): asserts str is LicenseKeyString {
   if (!isLicenseKeyString(str)) {
      throw new Error('Not a LicenseKey string!')
   }
}
export function makeLicenseKeyString(str: string) {
   assertLicenseKeyString(str)
   return str
}

const licenseKeyString = ((baseX as any).default as typeof baseX)('123456789ABCDEFGHIJKLMNPQRSTUVWXYZ')

export const toLicenseKeyString = licenseKeyString.encode.bind(licenseKeyString) as (buffer: Uint8Array) => LicenseKeyString
export const fromLicenseKeyString = licenseKeyString.decode.bind(licenseKeyString) as (string: LicenseKeyString) => Uint8Array