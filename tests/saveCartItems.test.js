const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - saveCartItems function tests', () => {
  it('should call localStorage.setItem method if a HTML list is set as the argument ', () => {
    const HTML = '<ol><li>Item</li></ol>';
    saveCartItems(HTML);
    const storage = localStorage.setItem;
    expect(storage).toHaveBeenCalled();
  })
  it('should call localStorage.setItem method with the right arguments', () => {
    const HTML = '<ol><li>Item</li></ol>';
    saveCartItems(HTML);
    const arg = ['cartItems', HTML];
    const storage = localStorage.setItem;
    expect(storage).toBeCalledWith(...arg);
  })
  // fail('Teste vazio');
});
