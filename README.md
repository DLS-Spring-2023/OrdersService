# Orders Service Api
API Service for Orders

## You have available the following endpoints:

<br>

## Create a new order

<br>

Request: POST '/orders/create-order'

Takes a body with following properties

Example:

```json
  {
    customer_email: string,
    items_id: number[],
    total_price: number,
  }
```

The date is insert automatically and customer_id is being taken from the authentication token.

Responses:

200: Will return created order

400: No customer Id found

400: The request was invalid

<br>

## Get all user's orders

<br>

Request: GET '/orders/purchase-history'

Returns all orders created by the user

<br>

Responses:

200: Will return created order

400: No customer Id found

400: The request was invalid

<br>

