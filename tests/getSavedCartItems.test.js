const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - getSavedCartItems function tests', () => {
  it('should call localStorage.getItem method', () => {
    getSavedCartItems();
    const storage = localStorage.getItem;
    expect(storage).toHaveBeenCalled();
  })
  it('should call localStorage.getItem method with cartItem as an argument', () => {
    getSavedCartItems();
    const arg = 'cartItems';
    const storage = localStorage.getItem;
    expect(storage).toBeCalledWith(arg);
  })
  // fail('Teste vazio');
});
