export const TruncateText = (text: string) => {
  return text.length < 25 ? text : text.slice(0, 25) + "...";
};
