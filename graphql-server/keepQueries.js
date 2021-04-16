// query allProducts {
//   allProducts{
//     id
//   	title
//     description
//   }
// }

// query allCategories{
//   allCategories{
//     description
//   }
// }

// query catByID{
//   categoryById(id: 367){
//     id
//     description
//     product{
//       title
//     }
//   }
// }
// mutation createProduct{
//   createProduct(
//     data:{
//     title: "First Product Addition",
//     price: 299,
//     description: "this is the description for the first product added to the db",
//     category: "Vacation",
//     image: "https://via.placeholder.com/300.png/09f/fff"}

//   ){
//   id
//   title
//   price
//     description
//     category
//     image
//   }
// }

//   mutation deleteProduct{
//     deleteProduct(id: 21){
//       title
//       id
//     }
//   }

//   mutation updateProduct{
//     updateProduct(id: 5, data: {
//       title: "Test update product",
//       description: "test product description goes here",
//      price: 200.00,
//       category: "Category Update",
//       image: "https://via.placeholder.com/300.png/09f/fff"
//     }) {
//       id
//     	title
//     }
//   }
