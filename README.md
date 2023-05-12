# OrdersServiceApi
API Service for Orders

## You have available the following endpoints:

<br>

## Create a new order

Request: POST '/orders/create-order'

Takes a body with following properties

Example:

  {
  customer_email: string;
  items_id: number[];
  total_price: number;
}

Responses:

200: Will return created order

400: No customer Id found

400: The request was invalid

<br>

## Get all user's orders

Request: GET '/orders/purchase-history'

Returns all orders created by the user

Responses:

200: Will return created order

400: No customer Id found

400: The request was invalid

<br>

