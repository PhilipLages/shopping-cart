require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - fetchItem function tests', () => {
  it('should be a function', () => {
    expect(typeof fetchItem).toEqual('function');
  })
  it('should call fetch when "MLB1615760527" is set as the argument', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  })
  it('should use the endpoint "MLB1615760527"', async () => {
    expect.assertions(1);
    const url = 'https://api.mercadolibre.com/items/MLB1615760527'
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith(url);
  })
  it('should return "item" data structure correctly', async () => {
    expect.assertions(1);
    const returned = await fetchItem('MLB1615760527');
    expect(returned).toEqual(item);
  })
  it('should return an error if fetchItem is called without argument', async () => {
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  })
  // fail('Teste vazio');
});
