const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = ({ target }) => target.remove();

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const getItemData = async (endPoint) => {
  const data = await fetchItem(endPoint);
  return data;
};

const getCart = () => document.querySelector('.cart__items');

const addItemToCart = async ({ target }) => {
  const cart = getCart();
  const getId = getSkuFromProductItem(target.parentNode);
  const { id, title, price } = await getItemData(getId);
  cart.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));
  saveCartItems(cart.innerHTML);
};

const addBtnEvent = () => {
  const itemsBtn = document.querySelectorAll('.item__add');
  itemsBtn.forEach((btn) => btn.addEventListener('click', addItemToCart));
};

const getProductsData = async () => {
  const { results } = await fetchProducts('computador');
  return results;
};

const appendItems = async () => {
  const items = document.querySelector('.items');
  const data = await getProductsData();
  data.forEach((item) => {
    const { id, title, thumbnail } = item;
    items.appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
  });
  addBtnEvent();
};

const addCartItemsEvent = () => {
  const cart = getCart();
  cart.innerHTML = getSavedCartItems();
  const items = document.querySelectorAll('.cart__item');
  items.forEach((item) => item.addEventListener('click', cartItemClickListener));
};

const emptyCart = () => {
  const emptyBtn = document.querySelector('.empty-cart');
  emptyBtn.addEventListener('click', () => { getCart().innerHTML = ''; });
};

window.onload = () => { 
  appendItems();
  addCartItemsEvent();
  emptyCart();
};
