/**
 * African countries with their currencies
 * Static data for country/currency mapping
 */

export interface CountryInfo {
  name: string;
  currency: string;
  currencySymbol: string;
}

export const AFRICAN_COUNTRIES: Record<string, CountryInfo> = {
  DZ: { name: "Algeria", currency: "DZD", currencySymbol: "د.ج" },
  AO: { name: "Angola", currency: "AOA", currencySymbol: "Kz" },
  BJ: { name: "Benin", currency: "XOF", currencySymbol: "CFA" },
  BW: { name: "Botswana", currency: "BWP", currencySymbol: "P" },
  BF: { name: "Burkina Faso", currency: "XOF", currencySymbol: "CFA" },
  BI: { name: "Burundi", currency: "BIF", currencySymbol: "FBu" },
  CM: { name: "Cameroon", currency: "XAF", currencySymbol: "FCFA" },
  CV: { name: "Cape Verde", currency: "CVE", currencySymbol: "$" },
  CF: { name: "Central African Republic", currency: "XAF", currencySymbol: "FCFA" },
  TD: { name: "Chad", currency: "XAF", currencySymbol: "FCFA" },
  KM: { name: "Comoros", currency: "KMF", currencySymbol: "CF" },
  CG: { name: "Congo", currency: "XAF", currencySymbol: "FCFA" },
  CD: { name: "Democratic Republic of the Congo", currency: "CDF", currencySymbol: "FC" },
  CI: { name: "Côte d'Ivoire", currency: "XOF", currencySymbol: "CFA" },
  DJ: { name: "Djibouti", currency: "DJF", currencySymbol: "Fdj" },
  EG: { name: "Egypt", currency: "EGP", currencySymbol: "£" },
  GQ: { name: "Equatorial Guinea", currency: "XAF", currencySymbol: "FCFA" },
  ER: { name: "Eritrea", currency: "ERN", currencySymbol: "Nfk" },
  ET: { name: "Ethiopia", currency: "ETB", currencySymbol: "Br" },
  GA: { name: "Gabon", currency: "XAF", currencySymbol: "FCFA" },
  GM: { name: "Gambia", currency: "GMD", currencySymbol: "D" },
  GH: { name: "Ghana", currency: "GHS", currencySymbol: "₵" },
  GN: { name: "Guinea", currency: "GNF", currencySymbol: "FG" },
  GW: { name: "Guinea-Bissau", currency: "XOF", currencySymbol: "CFA" },
  KE: { name: "Kenya", currency: "KES", currencySymbol: "KSh" },
  LS: { name: "Lesotho", currency: "LSL", currencySymbol: "L" },
  LR: { name: "Liberia", currency: "LRD", currencySymbol: "$" },
  LY: { name: "Libya", currency: "LYD", currencySymbol: "ل.د" },
  MG: { name: "Madagascar", currency: "MGA", currencySymbol: "Ar" },
  MW: { name: "Malawi", currency: "MWK", currencySymbol: "MK" },
  ML: { name: "Mali", currency: "XOF", currencySymbol: "CFA" },
  MR: { name: "Mauritania", currency: "MRU", currencySymbol: "UM" },
  MU: { name: "Mauritius", currency: "MUR", currencySymbol: "₨" },
  MA: { name: "Morocco", currency: "MAD", currencySymbol: "د.م." },
  MZ: { name: "Mozambique", currency: "MZN", currencySymbol: "MT" },
  NA: { name: "Namibia", currency: "NAD", currencySymbol: "$" },
  NE: { name: "Niger", currency: "XOF", currencySymbol: "CFA" },
  NG: { name: "Nigeria", currency: "NGN", currencySymbol: "₦" },
  RW: { name: "Rwanda", currency: "RWF", currencySymbol: "FRw" },
  ST: { name: "São Tomé and Príncipe", currency: "STN", currencySymbol: "Db" },
  SN: { name: "Senegal", currency: "XOF", currencySymbol: "CFA" },
  SC: { name: "Seychelles", currency: "SCR", currencySymbol: "₨" },
  SL: { name: "Sierra Leone", currency: "SLL", currencySymbol: "Le" },
  SO: { name: "Somalia", currency: "SOS", currencySymbol: "Sh" },
  ZA: { name: "South Africa", currency: "ZAR", currencySymbol: "R" },
  SS: { name: "South Sudan", currency: "SSP", currencySymbol: "£" },
  SD: { name: "Sudan", currency: "SDG", currencySymbol: "ج.س." },
  SZ: { name: "Eswatini", currency: "SZL", currencySymbol: "L" },
  TZ: { name: "Tanzania", currency: "TZS", currencySymbol: "TSh" },
  TG: { name: "Togo", currency: "XOF", currencySymbol: "CFA" },
  TN: { name: "Tunisia", currency: "TND", currencySymbol: "د.ت" },
  UG: { name: "Uganda", currency: "UGX", currencySymbol: "USh" },
  ZM: { name: "Zambia", currency: "ZMW", currencySymbol: "ZK" },
  ZW: { name: "Zimbabwe", currency: "ZWL", currencySymbol: "$" },
};

/**
 * Helper function to get country info by country name
 */
export function getCountryByName(countryName: string): CountryInfo | undefined {
  return Object.values(AFRICAN_COUNTRIES).find(
    (country) => country.name.toLowerCase() === countryName.toLowerCase()
  );
}

/**
 * Helper function to get currency by country code
 */
export function getCurrencyByCountryCode(countryCode: string): string | undefined {
  return AFRICAN_COUNTRIES[countryCode]?.currency;
}

/**
 * Helper function to get currency symbol by country code
 */
export function getCurrencySymbolByCountryCode(countryCode: string): string | undefined {
  return AFRICAN_COUNTRIES[countryCode]?.currencySymbol;
}
