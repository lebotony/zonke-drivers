export const capitalizeFirstLetter = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const removeTrailingWhitespace = (text: string): string => {
  if (/\s$/.test(text)) {
    return text.replace(/\s+$/, "");
  }
  return text;
};
