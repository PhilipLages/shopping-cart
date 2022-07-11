const fetchProducts = async (url) => {
  const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${url}`;
  const result = await fetch(URL);
  const data = await result.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
