/**
 * All countries in the world with their currencies
 * Static data for country/currency mapping
 */

export interface CountryInfo {
  name: string;
  currency: string;
  currencySymbol: string;
}

export const COUNTRIES: Record<string, CountryInfo> = {
  // Africa
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

  // Asia
  AF: { name: "Afghanistan", currency: "AFN", currencySymbol: "؋" },
  AM: { name: "Armenia", currency: "AMD", currencySymbol: "֏" },
  AZ: { name: "Azerbaijan", currency: "AZN", currencySymbol: "₼" },
  BH: { name: "Bahrain", currency: "BHD", currencySymbol: "ب.د" },
  BD: { name: "Bangladesh", currency: "BDT", currencySymbol: "৳" },
  BT: { name: "Bhutan", currency: "BTN", currencySymbol: "Nu." },
  BN: { name: "Brunei", currency: "BND", currencySymbol: "$" },
  KH: { name: "Cambodia", currency: "KHR", currencySymbol: "៛" },
  CN: { name: "China", currency: "CNY", currencySymbol: "¥" },
  GE: { name: "Georgia", currency: "GEL", currencySymbol: "₾" },
  IN: { name: "India", currency: "INR", currencySymbol: "₹" },
  ID: { name: "Indonesia", currency: "IDR", currencySymbol: "Rp" },
  IR: { name: "Iran", currency: "IRR", currencySymbol: "﷼" },
  IQ: { name: "Iraq", currency: "IQD", currencySymbol: "ع.د" },
  IL: { name: "Israel", currency: "ILS", currencySymbol: "₪" },
  JP: { name: "Japan", currency: "JPY", currencySymbol: "¥" },
  JO: { name: "Jordan", currency: "JOD", currencySymbol: "د.ا" },
  KZ: { name: "Kazakhstan", currency: "KZT", currencySymbol: "₸" },
  KW: { name: "Kuwait", currency: "KWD", currencySymbol: "د.ك" },
  KG: { name: "Kyrgyzstan", currency: "KGS", currencySymbol: "с" },
  LA: { name: "Laos", currency: "LAK", currencySymbol: "₭" },
  LB: { name: "Lebanon", currency: "LBP", currencySymbol: "ل.ل" },
  MY: { name: "Malaysia", currency: "MYR", currencySymbol: "RM" },
  MV: { name: "Maldives", currency: "MVR", currencySymbol: "Rf" },
  MN: { name: "Mongolia", currency: "MNT", currencySymbol: "₮" },
  MM: { name: "Myanmar", currency: "MMK", currencySymbol: "K" },
  NP: { name: "Nepal", currency: "NPR", currencySymbol: "₨" },
  KP: { name: "North Korea", currency: "KPW", currencySymbol: "₩" },
  OM: { name: "Oman", currency: "OMR", currencySymbol: "ر.ع." },
  PK: { name: "Pakistan", currency: "PKR", currencySymbol: "₨" },
  PS: { name: "Palestine", currency: "ILS", currencySymbol: "₪" },
  PH: { name: "Philippines", currency: "PHP", currencySymbol: "₱" },
  QA: { name: "Qatar", currency: "QAR", currencySymbol: "ر.ق" },
  SA: { name: "Saudi Arabia", currency: "SAR", currencySymbol: "ر.س" },
  SG: { name: "Singapore", currency: "SGD", currencySymbol: "$" },
  KR: { name: "South Korea", currency: "KRW", currencySymbol: "₩" },
  LK: { name: "Sri Lanka", currency: "LKR", currencySymbol: "Rs" },
  SY: { name: "Syria", currency: "SYP", currencySymbol: "£" },
  TW: { name: "Taiwan", currency: "TWD", currencySymbol: "NT$" },
  TJ: { name: "Tajikistan", currency: "TJS", currencySymbol: "ЅМ" },
  TH: { name: "Thailand", currency: "THB", currencySymbol: "฿" },
  TL: { name: "Timor-Leste", currency: "USD", currencySymbol: "$" },
  TR: { name: "Turkey", currency: "TRY", currencySymbol: "₺" },
  TM: { name: "Turkmenistan", currency: "TMT", currencySymbol: "m" },
  AE: { name: "United Arab Emirates", currency: "AED", currencySymbol: "د.إ" },
  UZ: { name: "Uzbekistan", currency: "UZS", currencySymbol: "so'm" },
  VN: { name: "Vietnam", currency: "VND", currencySymbol: "₫" },
  YE: { name: "Yemen", currency: "YER", currencySymbol: "﷼" },

  // Europe
  AL: { name: "Albania", currency: "ALL", currencySymbol: "L" },
  AD: { name: "Andorra", currency: "EUR", currencySymbol: "€" },
  AT: { name: "Austria", currency: "EUR", currencySymbol: "€" },
  BY: { name: "Belarus", currency: "BYN", currencySymbol: "Br" },
  BE: { name: "Belgium", currency: "EUR", currencySymbol: "€" },
  BA: { name: "Bosnia and Herzegovina", currency: "BAM", currencySymbol: "KM" },
  BG: { name: "Bulgaria", currency: "BGN", currencySymbol: "лв" },
  HR: { name: "Croatia", currency: "EUR", currencySymbol: "€" },
  CY: { name: "Cyprus", currency: "EUR", currencySymbol: "€" },
  CZ: { name: "Czech Republic", currency: "CZK", currencySymbol: "Kč" },
  DK: { name: "Denmark", currency: "DKK", currencySymbol: "kr" },
  EE: { name: "Estonia", currency: "EUR", currencySymbol: "€" },
  FI: { name: "Finland", currency: "EUR", currencySymbol: "€" },
  FR: { name: "France", currency: "EUR", currencySymbol: "€" },
  DE: { name: "Germany", currency: "EUR", currencySymbol: "€" },
  GR: { name: "Greece", currency: "EUR", currencySymbol: "€" },
  HU: { name: "Hungary", currency: "HUF", currencySymbol: "Ft" },
  IS: { name: "Iceland", currency: "ISK", currencySymbol: "kr" },
  IE: { name: "Ireland", currency: "EUR", currencySymbol: "€" },
  IT: { name: "Italy", currency: "EUR", currencySymbol: "€" },
  XK: { name: "Kosovo", currency: "EUR", currencySymbol: "€" },
  LV: { name: "Latvia", currency: "EUR", currencySymbol: "€" },
  LI: { name: "Liechtenstein", currency: "CHF", currencySymbol: "Fr" },
  LT: { name: "Lithuania", currency: "EUR", currencySymbol: "€" },
  LU: { name: "Luxembourg", currency: "EUR", currencySymbol: "€" },
  MT: { name: "Malta", currency: "EUR", currencySymbol: "€" },
  MD: { name: "Moldova", currency: "MDL", currencySymbol: "L" },
  MC: { name: "Monaco", currency: "EUR", currencySymbol: "€" },
  ME: { name: "Montenegro", currency: "EUR", currencySymbol: "€" },
  NL: { name: "Netherlands", currency: "EUR", currencySymbol: "€" },
  MK: { name: "North Macedonia", currency: "MKD", currencySymbol: "ден" },
  NO: { name: "Norway", currency: "NOK", currencySymbol: "kr" },
  PL: { name: "Poland", currency: "PLN", currencySymbol: "zł" },
  PT: { name: "Portugal", currency: "EUR", currencySymbol: "€" },
  RO: { name: "Romania", currency: "RON", currencySymbol: "lei" },
  RU: { name: "Russia", currency: "RUB", currencySymbol: "₽" },
  SM: { name: "San Marino", currency: "EUR", currencySymbol: "€" },
  RS: { name: "Serbia", currency: "RSD", currencySymbol: "дин" },
  SK: { name: "Slovakia", currency: "EUR", currencySymbol: "€" },
  SI: { name: "Slovenia", currency: "EUR", currencySymbol: "€" },
  ES: { name: "Spain", currency: "EUR", currencySymbol: "€" },
  SE: { name: "Sweden", currency: "SEK", currencySymbol: "kr" },
  CH: { name: "Switzerland", currency: "CHF", currencySymbol: "Fr" },
  UA: { name: "Ukraine", currency: "UAH", currencySymbol: "₴" },
  GB: { name: "United Kingdom", currency: "GBP", currencySymbol: "£" },
  VA: { name: "Vatican City", currency: "EUR", currencySymbol: "€" },

  // North America
  AG: { name: "Antigua and Barbuda", currency: "XCD", currencySymbol: "$" },
  BS: { name: "Bahamas", currency: "BSD", currencySymbol: "$" },
  BB: { name: "Barbados", currency: "BBD", currencySymbol: "$" },
  BZ: { name: "Belize", currency: "BZD", currencySymbol: "$" },
  CA: { name: "Canada", currency: "CAD", currencySymbol: "$" },
  CR: { name: "Costa Rica", currency: "CRC", currencySymbol: "₡" },
  CU: { name: "Cuba", currency: "CUP", currencySymbol: "$" },
  DM: { name: "Dominica", currency: "XCD", currencySymbol: "$" },
  DO: { name: "Dominican Republic", currency: "DOP", currencySymbol: "$" },
  SV: { name: "El Salvador", currency: "USD", currencySymbol: "$" },
  GD: { name: "Grenada", currency: "XCD", currencySymbol: "$" },
  GT: { name: "Guatemala", currency: "GTQ", currencySymbol: "Q" },
  HT: { name: "Haiti", currency: "HTG", currencySymbol: "G" },
  HN: { name: "Honduras", currency: "HNL", currencySymbol: "L" },
  JM: { name: "Jamaica", currency: "JMD", currencySymbol: "$" },
  MX: { name: "Mexico", currency: "MXN", currencySymbol: "$" },
  NI: { name: "Nicaragua", currency: "NIO", currencySymbol: "C$" },
  PA: { name: "Panama", currency: "PAB", currencySymbol: "B/." },
  KN: { name: "Saint Kitts and Nevis", currency: "XCD", currencySymbol: "$" },
  LC: { name: "Saint Lucia", currency: "XCD", currencySymbol: "$" },
  VC: { name: "Saint Vincent and the Grenadines", currency: "XCD", currencySymbol: "$" },
  TT: { name: "Trinidad and Tobago", currency: "TTD", currencySymbol: "$" },
  US: { name: "United States", currency: "USD", currencySymbol: "$" },

  // South America
  AR: { name: "Argentina", currency: "ARS", currencySymbol: "$" },
  BO: { name: "Bolivia", currency: "BOB", currencySymbol: "Bs." },
  BR: { name: "Brazil", currency: "BRL", currencySymbol: "R$" },
  CL: { name: "Chile", currency: "CLP", currencySymbol: "$" },
  CO: { name: "Colombia", currency: "COP", currencySymbol: "$" },
  EC: { name: "Ecuador", currency: "USD", currencySymbol: "$" },
  GY: { name: "Guyana", currency: "GYD", currencySymbol: "$" },
  PY: { name: "Paraguay", currency: "PYG", currencySymbol: "₲" },
  PE: { name: "Peru", currency: "PEN", currencySymbol: "S/" },
  SR: { name: "Suriname", currency: "SRD", currencySymbol: "$" },
  UY: { name: "Uruguay", currency: "UYU", currencySymbol: "$" },
  VE: { name: "Venezuela", currency: "VES", currencySymbol: "Bs." },

  // Oceania
  AU: { name: "Australia", currency: "AUD", currencySymbol: "$" },
  FJ: { name: "Fiji", currency: "FJD", currencySymbol: "$" },
  KI: { name: "Kiribati", currency: "AUD", currencySymbol: "$" },
  MH: { name: "Marshall Islands", currency: "USD", currencySymbol: "$" },
  FM: { name: "Micronesia", currency: "USD", currencySymbol: "$" },
  NR: { name: "Nauru", currency: "AUD", currencySymbol: "$" },
  NZ: { name: "New Zealand", currency: "NZD", currencySymbol: "$" },
  PW: { name: "Palau", currency: "USD", currencySymbol: "$" },
  PG: { name: "Papua New Guinea", currency: "PGK", currencySymbol: "K" },
  WS: { name: "Samoa", currency: "WST", currencySymbol: "T" },
  SB: { name: "Solomon Islands", currency: "SBD", currencySymbol: "$" },
  TO: { name: "Tonga", currency: "TOP", currencySymbol: "T$" },
  TV: { name: "Tuvalu", currency: "AUD", currencySymbol: "$" },
  VU: { name: "Vanuatu", currency: "VUV", currencySymbol: "Vt" },
};

// Legacy export for backward compatibility
export const AFRICAN_COUNTRIES = Object.fromEntries(
  Object.entries(COUNTRIES).filter(([code]) =>
    ["DZ", "AO", "BJ", "BW", "BF", "BI", "CM", "CV", "CF", "TD", "KM", "CG", "CD", "CI", "DJ", "EG", "GQ", "ER", "ET", "GA", "GM", "GH", "GN", "GW", "KE", "LS", "LR", "LY", "MG", "MW", "ML", "MR", "MU", "MA", "MZ", "NA", "NE", "NG", "RW", "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "SZ", "TZ", "TG", "TN", "UG", "ZM", "ZW"].includes(code)
  )
);

/**
 * Helper function to get country info by country name
 */
export function getCountryByName(countryName: string): CountryInfo | undefined {
  return Object.values(COUNTRIES).find(
    (country) => country.name.toLowerCase() === countryName.toLowerCase()
  );
}

/**
 * Helper function to get currency by country code
 */
export function getCurrencyByCountryCode(countryCode: string): string | undefined {
  return COUNTRIES[countryCode]?.currency;
}

/**
 * Helper function to get currency symbol by country code
 */
export function getCurrencySymbolByCountryCode(countryCode: string): string | undefined {
  return COUNTRIES[countryCode]?.currencySymbol;
}
