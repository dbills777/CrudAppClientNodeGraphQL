# GraphQL API Node Server
[ProductList.js](https://github.com/dbills777/CrudAppClientNodeGraphQL/blob/main/client/src/Components/ProductList.js)

## Prisma as your data modeling tool
[Prisma Folder-> migrations: seed: shchema: ](https://github.com/dbills777/CrudAppClientNodeGraphQL/blob/main/client/src/Components/ProductList.js)
<br>

[Full schema.js](https://github.com/dbills777/CrudAppClientNodeGraphQL/blob/main/graphql-server/src/schema.js)

## Docker-based PostgreSQL or MySQL as your data store
  - PostgreSQL

## At least 3 Query resolvers allowing users to get data from your server
1
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
2
```javascript
// Loads on page load and fills select list with categories in db
query allCategories{
  allCategories{
    description
  }
}
```
3
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
4
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
Full Query Resolvers
```javascript
const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('allProducts', {
      type: 'Product',
      resolve: (_parent, _args, context) => {
        return context.prisma.product.findMany()
      },
    })
    t.nonNull.list.nonNull.field('allCategories', {
      type: 'Category',
      resolve: (_parent, _args, context) => {
        return context.prisma.category.findMany()
      },
    })

    t.nullable.field('categoryById', {
      type: 'Category',
      args: {
        id: intArg(),
      },
      resolve: (_parent, args, context) => {
        return context.prisma.category.findUnique({
          where: { id: args.id || undefined },
        })
      },
    })
    t.nullable.field('productById', {
      type: 'Product',
      args: {
        id: intArg(),
      },
      resolve: (_parent, args, context) => {
        return context.prisma.product.findUnique({
          where: { id: args.id || undefined },
        })
      },
    })
```

## At least 2 Mutation resolvers allowing users to create, update, or upsert an item.
1
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
 2
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
Full Mutaion Resolvers
```javascript
const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
      t.nonNull.field('createProduct', {
        type: 'Product',
        args: {
          data: nonNull(
            arg({
              type: 'ProductCreateInput',
            }),
          ),
        },
        resolve: (_, args, context) => {
          return context.prisma.product.create({
            data: {
              title: args.data.title,
              price: args.data.price,
              description: args.data.description,
              category: args.data.category,
              image: args.data.image,

            },
          })
        },
    })

    t.field('createCategory', {
      type: 'Category',
      args: {
        data: nonNull(
          arg({
            type: 'CategoryCreateInput',
          }),
        ),
        productTitle: nonNull(stringArg()),
      },
      resolve: (_, args, context) => {
        return context.prisma.category.create({
          data: {
            description: args.data.description,
            content: args.data.content,
            product: {
              connect: { title: args.productTitle },
            },
          },
        })
      },
    })
     t.field('updateProduct', {
        type: 'Product',
        args: {
          id: nonNull(intArg()),
          data: nonNull(
            arg({
              type: 'ProductCreateInput',
            }),
          ),
        },
        resolve: (_, args, context) => {
          return context.prisma.product.update({
            where: { id: args.id || undefined },
            data: {
              title: args.data.title,
              price: args.data.price,
              description: args.data.description,
              category: args.data.category,
              image: args.data.image,
            },
          })
        },
      })
```

## At least 1 Mutation resolver allowing users to delete an item.
1
```javascript
// clicking delete button deletes a product from the db
  mutation deleteProduct{
    deleteProduct(id: 21){
      title
      id
    }
  }
```
Full Delete Resolver
```javascript
   t.field('deleteProduct', {
        type: 'Product',
        args: {
          id: nonNull(intArg()),
        },
        resolve: (_, args, context) => {
          return context.prisma.product.delete({
            where: { id: args.id },
          })
        },
      })
```

## Your datastore will contain at least 25 items
- Preloaded with >= 25 items

## Your app will be deployable locally using Docker and will have seed data entered into the datastore.
 - Docker Container Deployed to Heroku
 - Datastore loaded

## All of your source code will be properly uploaded to GitHub
-properly uploaded to GitHub

## Your ReadMe file will accurately describe your server install and run process and how to use the APIs


