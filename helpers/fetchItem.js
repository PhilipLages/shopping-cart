const fetchItem = async (id) => {
  try {const URL = `https://api.mercadolibre.com/items/${id}`;
  const result = await fetch(URL);
  const data = await result.json();
  return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
