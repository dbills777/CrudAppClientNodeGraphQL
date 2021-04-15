# RESTful CRUD Node Server Assignment

## Mongoose as your data modeling tool

## Cloud-based MongoDB as your data store

## At least 3 endpoints to GET data from your server
- This Endpoint execute on page load.
```javascript
//Use route in app.js
app.use('/character', characterRouter);
//Specify endpoint
characterRouter.get('/', getAllCharcters);
//Example Get
const response = await axios.get(`${url}/character`);
```
- This Endpoint will execute when search Icon is clicked.
```javascript
//Use route in app.js
app.use('/character', characterRouter);
//Specify endpoint
characterRouter.get('/search', seachCharacters);
//Example query
const response = await axios.get(`${url}/search?term=${searchTerm}`);
```
- This Endpoint will execute when navigating to the episodes table.
```javascript
//Use route in app.js
app.use('/episode', episodeRouter);
//Specify endpoint
episodeRouter.get('/', getAllEpisodes);
//Example GET
const response = await axios.get(`${url}/episode`);
```

## At least 1 endpoint allowing user to update an item via PUT or PATCH HTTP verbs
- This Endpoint will execute when Editing a characters info by either clicking the "dots" or "edit icon".

```javascript
//Use route in app.js
app.use('/character', characterRouter);

//Specify endpoint
characterRouter.put('/update-name', updateName);
characterRouter.put('/update-nick-name', updateNickName);
//Example PUT Requests
await axios.put(`${url}/update-name`, {
  characterID: currentCharacter._id,
  name: newName,
});
await axios.put(`${url}/update-nick-name`, {
  characterID: currentCharacter._id,
  nickname: newNickName,
});
```

## At least 1 endpoint allowing user to create an item via POST
- Post is also implemented using seed/loadDB.js and seed/loadEpisode.js
- This Endpoint will execute when clicking save on form that opens from clicking the plus button.

```javascript
//Use route in app.js
app.use('/character', characterRouter);
//Specify endpoint
characterRouter.post('/', postAddCharacter);
//Example post
 await axios.post(`${url}/character`, {
      name: postData.name,
      image: postData.image,
      nickname: postData.nickname,
      occupation: postData.occupation,
      status: postData.status,
      portrayed: postData.portrayed,
      char_id: postData.char_id,
    });
```
## At least 1 endpoint allowing user to delete an item via DELETE
- This Endpoint will execute when clicking delete in the modal that opens following the clickign of the delete icon.

```javascript
//Use route in app.js
app.use('/character', characterRouter);
//Specify endpoint
characterRouter.delete('/', deleteCharactersByID);
//Example Delete
    await axios.delete(`${url}/character`, {
      data: {
        productID: currentCharacter._id,
      },
    });
```

## Your datastore will contain at least 25 items
- contains 60+ items

## Your app will be deployed to production using some service like Heroku, Digital Ocean, etc.
- Server Deployed to Heroku
- FrontEnd Deployed to Netlify

## All of your source code will be properly uploaded to GitHub

## Your ReadMe file will accurately describe the server install process (if any) and how to use the APIs from your web client.
