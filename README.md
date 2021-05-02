# Final Project

## To Run Locally
1.  Place .env (file one in root directory).
2.  Place .env (file two in graphql/prisma directory)
3.  npm install from root dir
4.  npm run launch from root dir
5.  npm run migrate from root dir
6.  npm run seed:product from root dir
7.  npm run start-dev from root dir


# 1. Effectively use conditional logic, JavaScript array methods, and front-end framework elements to render large lists on the web client.

- Example of a Array Methods, JSX elements, and simple conditional logic.

```javascript
return quotes.map((item) => {
  const author = item.author;
  const image = items.characters.filter((person) => {
    return person.name === author || person.nickname === author;
  });
  const photo = image.map((person) => person.image);
  return (
    <div className='quoteDiv' key={item.quote_id} style={style}>
      <button className='btn' onClick={getNewQuote}>
        New quote
      </button>
      <br></br>
      <div className='bubble' style={style}>
        <em className='italics'>
          <h3>
            <strong></strong> "{item.quote}"
          </h3>
        </em>
      </div>
      <p className='flex'>
        {image.length ? (
          <>
            <Slide direction='left' in={checked} mountOnEnter unmountOnExit>
              <img alt={photo.id} className='img' src={photo}></img>
            </Slide>
          </>
        ) : null}
        -{item.author}, {item.series}
      </p>
    </div>
  );
});
```

<br>

# 2. Work with the proper libraries (e.g. VueJS, React) to create and manage the front-end portion of your project using a real development toolset.

## React used as front-end library.

<br>

# 3. Work with NPM and NodeJS to create and manage the back-end portion of your project.

## Extensive use of NPM and NodeJS for managing of packages and dependencies.

<br>

# 4. "Seed" script provides way to populate the datastore after the Docker install and launch.

## Docker has the ability to seed a list of example products into a PostgreSQL Datastore. This happens automatically through the commands when docker-compose is started.

<br>

# 5. Properly use Git for your source version control with an established record of at least 4 days of commits each week from February 19th through April 30th.

<br>

# 6. Present a User Interface route or "page" that allows the user to:(Rest: Characters, Quotes, Episode Table)

- CREATE a meaningful (at least 5 data fields) resource through a REST endpoint that is stored in the datastore

  - DataStore and User Input Posting uses this this endpoint:

  ```javascript
  export const postAddCharacter = (req, res) => {
    const character = new Character({
      name: req.body.name,
      occupation: req.body.occupation,
      image: req.body.image,
      status: req.body.status,
      nickname: req.body.nickname,
      portrayed: req.body.portrayed,
      char_id: req.body.char_id,
    });
    character.save();
    res.json(character);
  };
  ```

- Read or GET meaningful data from 3 different REST endpoints

  - Get all Characters from MongoDB
  ```javascript
  export const getAllCharcters = async (req, res) => {
    const chars = await Character.find();
    res.send(chars);
  };
  ```

  - Search Mongo using mongo indexing. (Works but only for last name, needs to be fixed)

  ```javascript
  const handleSeach = async () => {
    if (!searchTerm) {
      getCharacters();
    } else {
      try {
        const response = await axios.get(`${url}/search?term=${searchTerm}`);
        const sorted = response.data.sort((a, b) => a.char_id - b.char_id);
        setCharacters(sorted);
      } catch (error) {
        console.log(error);
      }
    }
  };
  ```

- UPDATE at least 1 portion of meaningful data through the appropriate endpoint.

  - update name and nickname for a character in db

  ```javascript
  export const updateName = async (req, res) => {
    const characterID = req.body.characterID;
    const newItemInfo = {
      name: req.body.name,
    };
    try {
      try {
        const char = await Character.findByIdAndUpdate(characterID, newItemInfo, { new: true });
        res.json(char);
      } catch (err) {
        res.status(400).json({ Message: `Could not update: ${err}` });
      }
    } catch (error) {
      res.status(400).json({ Message: `Invalid char ${err}` });
    }
  };
  export const updateNickName = async (req, res) => {
    const characterID = req.body.characterID;
    const newItemInfo = {
      nickname: req.body.nickname,
    };
    try {
      try {
        const char = await Character.findByIdAndUpdate(characterID, newItemInfo, { new: true });
        res.json(char);
      } catch (err) {
        res.status(400).json({ Message: `Could not update: ${err}` });
      }
    } catch (error) {
      res.status(400).json({ Message: `Invalid char ${err}` });
    }
  };
  ```

- DELETE some resource via the proper endpoint
  - delete a character from db
  ```javascript
  export const deleteCharactersByID = async (req, res) => {
    const productID = req.body.productID;
    try {
      const deleteProduct = await Character.findByIdAndRemove(productID);
      if (!deleteProduct) {
        return res.status(400)({ Message: `Item with that ${productID} is not found` });
      }
      console.log(`Deleted: ${deleteProduct}`);
      res.sendStatus(200);
    } catch (error) {
      res.status(400).json({ Message: `Invalid ProductID ${error}` });
    }
  };
  ```
  <br>

# 7. Present a User Interface route or "page" that allows the user to: (Graphql routes: Products Tab)

- Present a separate User Interface route or "page" that allows the user to:
- CREATE a meaningful (at least 5 data fields) resource through a GraphQL endpoint that is stored in the datastore.
  - Clicking add product shows a form that allows a user to post a new product.

```javascript
//These are the data fields that are available when creating a new product.
const CREATE_PRODUCT = gql`
  mutation createProduct($title: String!, $price: String!, $description: String!, $category: String!, $image: String!) {
    createProduct(
      data: { title: $title, price: $price, description: $description, category: $category, image: $image }
    ) {
      id
    }
  }
`;
```

- Read or GET meaningful data from with at least 3 different query options from the GraphQL endpoint.
  1. Get All Products From db
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

2. Get All Categories From db

```javascript
query allCategories{
  allCategories{
    description
  }
}
```

3. Get A Product by ID

```javascript
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

4. Get a Category By ID

```javascript

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

- UPDATE at least 1 portion of meaningful data through an appropriate GraphQL mutation.
- 1. To Update Product Details For An Existing Product

```javascript
// clicking edit and submitting the form updates a products details in db
    mutation updateProduct{
    updateProduct(id: 1, data: {
      title: "Test update product number 1",
      description: "test product description goes here",
     	price: "299.00",
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

- DELETE some resource using a proper GraphQL mutation.
- 1. To Delete An Existing Item

```javascript
// clicking delete button deletes a product from the db
  mutation deleteProduct{
    deleteProduct(id: 21){
      title
      id
    }
  }
```

<br>

# 8. You will submit the GitHub URL for your project with a detailed ReadMe explaining how to install and run your server(s) on Docker or from your deployed sites.

NodeJS server and Client are hosted via a container deployed to Heroku. GraphQL server is not hosted and needs to be run locally. (following instructions at top of page)

Currentyly the Client and REST portions are hosted to Heroku and functioning properly. The GraphQL Must run locally via the instructions.


