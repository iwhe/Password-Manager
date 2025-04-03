const generatePassword = (passwordLength) => {
  //   const passwordLength = 16;
  let charSet = "";
  //    generatedPassword = "";

  const lowercase = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(97 + i)
  ).join("");
  const uppercase = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  ).join("");
  const number = Array.from({ length: 10 }, (_, i) =>
    String.fromCharCode(48 + i)
  ).join("");
  const specialChar = "!@#$_-+=*/%&";

  charSet += lowercase;
  charSet += uppercase;
  charSet += number;
  charSet += specialChar;

  //   for (let i = 0; i < passwordLength; i++) {
  //     const randomValue = window.crypto.getRandomValues(charSet);
  //     generatedPassword += randomValue;
  //   }
  //   return generatedPassword;

  const array = new Uint32Array(passwordLength); // Create a typed array for random indices
  window.crypto.getRandomValues(array); // Fill it with random values
  const generatedPassword = Array.from(array, (randomValue) => {
    // Use the random value to pick a character from the charSet
    const index = randomValue % charSet.length;
    return charSet[index];
  }).join("");

  return generatedPassword;
};

export default generatePassword;
