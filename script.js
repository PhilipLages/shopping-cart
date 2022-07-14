const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  const imgArg = imageSource.replace('I.jpg', 'W.jpg')
  img.className = 'item__image';
  img.src = imgArg;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const getLoadingMsg = () => {
  const load = document.querySelector('.load');
  load.appendChild(createCustomElement('h4', 'loading', 'carregando...'));  
};

const removeLoadMsg = () => {
  const message = document.querySelector('.loading');
  message.remove();
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

const getItemData = async (endPoint) => {
  const data = await fetchItem(endPoint);
  return data;
};

const getCart = () => document.querySelector('.cart__items');

const getCartPrice = () => {
  const pricesArr = [];
  const cartItems = document.querySelectorAll('.cart__item');
  cartItems.forEach((item) => {
    const price = item.innerText.split('$');
    pricesArr.push(Number(price[1]));
  });
  return pricesArr;
};

const sumPrices = () => {
  const priceSection = document.querySelector('.total-price');
  const prices = getCartPrice();
  const total = prices.reduce((acc, curr) => acc + Number(curr), 0);
  priceSection.innerText = `Total: $${total.toFixed(2)}`;
};

const cartItemClickListener = ({ target }) => {
  target.remove();
  sumPrices();
}; 

const createCartItemElement = ({ img, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.style.display = 'flex';
  li.style.flexDirection = 'row-reverse';
  li.style.justifyContent = 'flex-end';
  li.style.fontSize = '15px';
  li.innerText = `${name}
  
  Preço: $${salePrice}`;
  li.appendChild(createProductImageElement(img));
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addItemToCart = async ({ target }) => {
  const cart = getCart();
  const getId = getSkuFromProductItem(target.parentNode);
  getLoadingMsg();
  const { thumbnail, title, price } = await getItemData(getId);
  removeLoadMsg();
  cart.appendChild(createCartItemElement({ img: thumbnail, name: title, salePrice: price }));
  saveCartItems(cart.innerHTML);
  sumPrices();
};

const createTotalPriceElement = () => {
  const cartSec = document.querySelector('.cart');
  const Btn = document.querySelector('.empty-cart');
  const totalPrice = document.createElement('p');
  totalPrice.className = 'total-price';
  cartSec.appendChild(totalPrice);
  cartSec.insertBefore(totalPrice, Btn);
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
  getLoadingMsg();
  const data = await getProductsData();
  removeLoadMsg();
  data.forEach((item) => {
    const { id, title, thumbnail } = item;
    items.appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
  });
  addBtnEvent();
};

const getFromLocalStorage = () => {
  const cart = getCart();
  cart.innerHTML = getSavedCartItems();
  const items = document.querySelectorAll('.cart__item');
  items.forEach((item) => item.addEventListener('click', cartItemClickListener));
};

const emptyCart = () => {
  const emptyBtn = document.querySelector('.empty-cart');
  emptyBtn.addEventListener('click', () => { 
    getCart().innerHTML = ''; 
    sumPrices();
  });  
};

const loadAsync = async () => {
  await appendItems();
};

window.onload = () => { 
  loadAsync();
  getFromLocalStorage();
  emptyCart();
  createTotalPriceElement();
  sumPrices();
};
