export const formatDate = (dateObject) =>
  Object.keys(dateObject)
    .sort((a, b) => b.localeCompare(a))
    .map((key) => dateObject[key])
    .join("-");

export const sleep = (delay) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
