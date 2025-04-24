export const formatDate = (date?: Date | string) => {
  if (!date) return "—"; // or any fallback text

  const parsedDate = typeof date === "string" ? new Date(date) : date;

  return parsedDate.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
