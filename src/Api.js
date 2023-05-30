export const Countries = () => {
  return fetch("https://restcountries.com/v3.1/all").then((response) =>
    response.json()
  );
};
export const Continents = () => {
  return fetch("https://restcountries.com/v3.1/region/north america").then(
    (response) => response.json()
  );
};
