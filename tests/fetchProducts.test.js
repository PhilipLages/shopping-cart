require('../helpers/fetchProducts');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/computer-search');

describe('1 - fetchProducts function tests', () => {
  it('should be a function', () => {
    expect(typeof fetchProducts).toEqual('function');
  })
  it('should call fetch when "computador" is set as the argument', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  })
  it('should return "computadorSearch" data structure correctly', async () => {
    expect.assertions(1);
    const returned = await fetchProducts('computador');
    expect(returned).toEqual(computadorSearch);
  })
  it('should return an error if fetchProducts is called without argument', async () => {
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  })
  // fail('Teste vazio');
});
