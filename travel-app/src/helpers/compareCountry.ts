const compareCountry = (searchQuery: string, countryName: string, capital: string) => {
  if (searchQuery.length === 0) {
    return true;
  }
  const queryLowerCase = searchQuery.toLowerCase();
  const coutryLowerCase = countryName.toLowerCase();
  const capitalLowerCase = capital.toLowerCase();

  const isNameIncludesSearchQuery = coutryLowerCase.includes(queryLowerCase);
  const isCapitalIncludesSearchQuery = capitalLowerCase.includes(queryLowerCase);

  if (!isNameIncludesSearchQuery && !isCapitalIncludesSearchQuery) {
    return false;
  }

  return true;
};

export default compareCountry;
