# Mongoose and Express Assignment 2

This Assignment is the second assignment of Apollo Level 2 Web development course organized by Programming Hero. This backend project
has connection to a live database. But anyone can run this project locally.

## How To Run This Project

Please follow the below instructions to run different branches of this repository in your machine:

1. Login to your GitHub account in your Terminal.

2. Clone this repository
   ```sh
   git clone https://github.com/faysalahmed000012/level-2-assignment-2.git
   ```
3. Go to the cloned project directory
   ```sh
   cd level-2-assignment-2
   ```
4. Run this command (Make sure typescript is installed in your computer)
   ```sh
   npm install
   tsc
   ```
5. Now Run the project
   ```sh
   node  ./dist/server.js
   ```

## Features

### Products

- GET all product in `/api/products`.
- POST a product in `/api/products`.
- GET a product by id in `/api/products/:productId`.

* Update Product `/api/products/:productId`

- Do Search Operation in products based on name and description in `/api/products?searchTerm=term`.
- DELETE a product in `/api/products/:productId`.

### Orders

- GET all orders in `/api/orders`.
- GET order by email in `/api/orders?email=myemail@gmail.com`.
- POST / place an order in `/api/orders`.
