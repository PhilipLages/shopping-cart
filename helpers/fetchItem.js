const fetchItem = async (id) => {
  const URL = `https://api.mercadolibre.com/items/${id}`;
  const result = await fetch(URL);
  const data = await result.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
