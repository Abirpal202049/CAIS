export const formatDate = (date: string) => {
  const newDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    newDate
  ); // editing and verification needed

  // Replace space before single-digit day with an empty string
  return formattedDate.replace(/ (\d) /, " $1 ").trim();
};
