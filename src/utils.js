export const getDayAbbreviation = (data) => {
  const dateObj = new Date(data * 1000);
  const utcString = dateObj.toUTCString();
  return utcString.slice(0, 3).toUpperCase();
};

export const getHomeLocation = () => {
  if (localStorage.getItem("homeLocation")) {
    return JSON.parse(localStorage.getItem("homeLocation"));
  } else {
    return null;
  }
};
