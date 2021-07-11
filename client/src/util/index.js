export const formatDate = (dateObject) =>
  Object.keys(dateObject)
    .sort((a, b) => b.localeCompare(a))
    .map((key) => dateObject[key])
    .join("-");

export const formatDateObjDisplay = (dateObject) =>
  Object.keys(dateObject)
    .sort((a, b) => a.localeCompare(b))
    .map((key) => dateObject[key])
    .join("/");

export const formatDisplayDate = (dateString) =>
  dateString.split("-").reverse().join("/");

export const formatUELN = (ueln) => {
  return ueln.split("").map((d, i) => {
    if (i === 3) {
      return ` ${d}`;
    }
    if (i !== 4 && i % 4 === 0) {
      return ` ${d}`;
    }
    return d;
  });
};

export const sleep = (delay) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
