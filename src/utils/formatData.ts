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

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export function formatString(data: any) {
  if (!data) return;
  var words = data.split("_");

  // Capitalize the first letter of each word
  var formattedWords = words.map(function (words: string) {
    return words.charAt(0).toUpperCase() + words.slice(1);
  });

  // Join the words with spaces
  var formattedString = formattedWords.join(" ");

  return formattedString;
}
