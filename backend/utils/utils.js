const replacePriceToFloat = (toReplace) => {
  if (typeof toReplace === "string" && toReplace !== "") {
    return parseFloat(toReplace?.split?.(/(\s+)/)?.[0]?.replace?.(",", "."));
  }
  return toReplace;
};

module.exports = {
  replacePriceToFloat,
};
