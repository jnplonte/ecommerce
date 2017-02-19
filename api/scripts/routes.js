function setup(app, functions) {
  app.get('/api/brands', functions.brands.allBrand);
  app.post('/api/brand', functions.brands.postBrand);
  app.get('/api/brand/:id', functions.brands.getBrand);
  app.put('/api/brand/:id', functions.brands.putBrand);
  app.delete('/api/brand/:id', functions.brands.deleteBrand);

  app.get('/api/users', functions.users.allUser);
  app.post('/api/user', functions.users.postUser);
  app.get('/api/user/:id', functions.users.getUser);
  app.put('/api/user/:id', functions.users.putUser);
  app.delete('/api/user/:id', functions.users.deleteUser);

  app.get('/api/products', functions.products.allProduct);
  app.post('/api/product', functions.products.postProduct);
  app.get('/api/product/:id', functions.products.getProduct);
  app.put('/api/product/:id', functions.products.putProduct);
  app.delete('/api/product/:id', functions.products.deleteProduct);

  app.get('/api/reviews', functions.reviews.allReview);
  app.post('/api/review/:product_id', functions.reviews.postReview);
  app.get('/api/review/:id', functions.reviews.getReview);
  app.put('/api/review/:id', functions.reviews.putReview);
  app.delete('/api/review/:id', functions.reviews.deleteReview);
}

exports.setup = setup;
