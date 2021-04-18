# GraphQL API Node Server

## Prisma as your data modeling tool

## Docker-based PostgreSQL or MySQL as your data store

## At least 3 Query resolvers allowing users to get data from your server
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
query allCategories{
  allCategories{

    description
  }
}
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

## At least 2 Mutation resolvers allowing users to create, update, or upsert an item.

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

## At least 1 Mutation resolver allowing users to delete an item.
  mutation deleteProduct{
    deleteProduct(id: 21){
      title
      id
    }
  }
## Your datastore will contain at least 25 items

## Your datastore will contain at least 25 items
- Preloaded with >= 25 items

## Your app will be deployable locally using Docker and will have seed data entered into the datastore.
//todo

## All of your source code will be properly uploaded to GitHub

## Your ReadMe file will accurately describe your server install and run process and how to use the APIs
