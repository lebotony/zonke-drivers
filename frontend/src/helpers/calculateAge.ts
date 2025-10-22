export const calculateAge = (dobString: string): number => {
  if (!dobString) return 0;

  // Parse YYYY-MM-DD string into a Date object
  const [year, month, day] = dobString.split("-").map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  // Check if birthday has happened yet this year
  const hasHadBirthday =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasHadBirthday) age--;

  return age;
};
