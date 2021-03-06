# ECOMMERCE BACKEND


## Dependencies
* nodejs: [https://nodejs.org/](https://nodejs.org/en/)
* expressjs: [https://expressjs.com/](https://expressjs.com/)
* mysql: [https://mysql.com/](https://mysql.com/)
* gulp: [http://gulpjs.com/](http://gulpjs.com/)


## Installation
* install npm dependencies by running `npm install` on both {root}/api
* import database and mock data by running `mysql -u -p ecommerce < {root}/ecommerce.sql`
* update the following configurations and database credentials on {root}/api/config.js


## How to Use
- go to {root}/api and run `gulp` it will listen to default http://localhost:3001

### Brands

#### get all brands
- **[GET]**  `/api/brands`
- optional params: "page"

#### get one brand
- **[GET]** `/api/brand/{brand_id}`
- required params: "brand_id"

#### add brand
- **[POST]** `/api/brand`
- required params: "name", "description"

#### update brand
- **[PUT]** `/api/brand/{brand_id}`
- required params: "brand_id"
- optional params: "name", "description"

#### delete brand
- **[DELETE]** `/api/brand/{brand_id}`
- required params: "brand_id"

### Products

#### get all products
- **[GET]**  `/api/products`
- optional params: "page", "brandId"

#### get one product
- **[GET]** `/api/product/{product_id}`
- required params: "product_id"

#### add product
- **[POST]** `/api/product`
- required params: "name", "brand_id", "description", "price", "color", "stock"
- optional params: "status" [0 -> outofstock 1 -> stock 2 -> archive]

#### update product
- **[PUT]** `/api/product/{product_id}`
- required params: "product_id"
- optional params: "name", "description", "price", "color", "stock", "status" [0 -> outofstock 1 -> stock 2 -> archive]

#### delete product
- **[DELETE]** `/api/brand/{product_id}`
- required params: "product_id"

### Reviews

#### get all reviews
- **[GET]**  `/api/reviews`
- optional params: "page"

#### get one review
- **[GET]** `/api/review/{review_id}`
- required params: "review_id"

#### add review
- **[POST]** `/api/review/{product_id}`
- required params: "product_id", "user_id", "rating" [1-10], "comment"

#### update review
- **[PUT]** `/api/review/{review_id}`
- required params: "review_id"
- optional params: "rating" [1-10], "comment"

#### delete review
- **[DELETE]** `/api/review/{review_id}`
- required params: "review_id"

### Users

#### get all users
- **[GET]**  `/api/users`
- optional params: "page"

#### get one user
- **[GET]** `/api/user/{user_id/email}`
- required params: "user_id/email"

#### add user
- **[POST]** `/api/user`
- required params: "name", "email"
- optional params: "bday", "type" [0 -> customer 1 -> merchant]

#### update user
- **[PUT]** `/api/user/{user_id}`
- required params: "user_id"
- optional params: "name", "bday", "type" [0 -> customer 1 -> merchant]

#### delete user
- **[DELETE]** `/api/user/{user_id}`
- required params: "user_id"
