export const getNewPosition = () => {
  const rowPosition = Math.floor(Math.random() * 4);
  const colPosition = Math.floor(Math.random() * 4);
  return [rowPosition, colPosition];
};

export const isExist = (array, term = 0) => {
  let found = false;

  for (let i = 0; i < array.length; i++) {
    found = array[i].some((i) => i === term);
    if (found) break;
  }
  return found;
};
