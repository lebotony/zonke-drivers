export const calculateAge = (dobString: string): number => {
  if (!dobString) return 0;

  const [year, month, day] = dobString.split("-").map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  if (birthDate > today) return 0; // prevents negative age

  let age = today.getFullYear() - birthDate.getFullYear();

  const hasHadBirthday =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasHadBirthday) age--;

  return age;
};

export const formatDateShort = (dateString?: string) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  // Month short names
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${day} ${month}`;
};
