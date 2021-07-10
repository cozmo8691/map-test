export const formatDate = (dateObject) =>
  Object.keys(dateObject)
    .sort((a, b) => b.localeCompare(a))
    .map((key) => dateObject[key])
    .join("-");
