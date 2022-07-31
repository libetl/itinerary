export const getRandomId = () =>
  [...crypto.getRandomValues(new Uint16Array(10))]
    .map(
      (val, i) =>
        `${
          i % 3 === 0
            ? String.fromCharCode((val % 26) + 65)
            : i % 3 === 1
            ? String.fromCharCode((val % 26) + 97)
            : String.fromCharCode((val % 10) + 48)
        }`
    )
    .join("");
