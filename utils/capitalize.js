const capitalize = (word) => {
  const wordArr = word.split("");
  return wordArr[0].toUpperCase() + wordArr.slice(1).join("");
};

module.exports = { capitalize };
