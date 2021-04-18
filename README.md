# GraphQL API Node Server

## Prisma as your data modeling tool

## Docker-based PostgreSQL or MySQL as your data store

## At least 3 Query resolvers allowing users to get data from your server
```javascript
// Loads on page Load
query allProducts {
  allProducts{
    id
  	title
    price
    description
    category
    image
  }
}
```
```javascript
// Loads on page load and fills select list with categories in db
query allCategories{
  allCategories{
    description
  }
}
```
```javascript
// not implementated in front end
query prodByID{
  productById(id: 2){
    id
  	title
    price
    description
    category
    image
  }
}
```
```javascript
// not implemented in front end
query catByID{
  categoryById(id: 367){
    id
    description
    product{
      title
    }
  }
}
```

## At least 2 Mutation resolvers allowing users to create, update, or upsert an item.
```javascript
// clicking edit and submitting the form updates a products details in db
    mutation updateProduct{
    updateProduct(id: 1, data: {
      title: "Test update product number 1",
      description: "test product description goes here",
     	price: "$$$$$$$",
      category: "Category Update",
      image: "https://via.placeholder.com/300.png/09f/fff"
    }) {
      id
    	title
      description
      price
      category
      image
    }
  }
  ```
  ```javascript
  // clicking add product button brings up page for adding a new product to db
  mutation createProduct{
  createProduct(
    data:{
    title: "First Product Addition",
    price: "299",
    description: "this is the description for the first product added to the db",
    category: "Vacation",
    image: "https://via.placeholder.com/300.png/09f/fff"}

  ){
  id
  title
  price
    description
    category
    image
  }
}
```
## At least 1 Mutation resolver allowing users to delete an item.
```javascript
// clicking delete button deletes a product from the db
  mutation deleteProduct{
    deleteProduct(id: 21){
      title
      id
    }
  }
```

## Your datastore will contain at least 25 items
- Preloaded with >= 25 items

## Your app will be deployable locally using Docker and will have seed data entered into the datastore.
//todo

## All of your source code will be properly uploaded to GitHub

## Your ReadMe file will accurately describe your server install and run process and how to use the APIs
