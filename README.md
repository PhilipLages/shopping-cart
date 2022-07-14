
# Project Shopping Cart

For this project at [Trybe](https://www.betrybe.com/), I developed the implementation of a dynamic shopping cart page for a fictitious store called "Trybe shopping". I had to request the API from [Mercado Livre ](https://www.mercadolivre.com.br/) to list computers for sale and add the option to put them in the cart.

## Lessons Learned

In this project, I developed skills such as API request and test-driven development (TDD) to create secure code
## API Reference

#### Get all items of selected type, such as "computer", for exemple

```http
  https://api.mercadolibre.com/sites/MLB/search?q=$QUERY
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `QUERY` | `string` | **Required**. Your API key to fetch |

#### Get item

```http
  https://api.mercadolibre.com/items/$ItemID
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `ItemID`      | `string` | **Required**. Id of item to fetch |



## 🛠 Skills used
HTML, CSS, Javascript ES6, Jest and API usage.


## Run Locally

Clone the project

```bash
  git clone git@github.com:PhilipLages/shopping-cart.git
```

Go to the project directory

```bash
  cd shopping-cart
```

Install dependencies

```bash
  npm install
```



## Running Tests

To run tests, run the following command

```bash
  npm test
```

