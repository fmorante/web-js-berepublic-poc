var frisby = require('frisby');
var URL = 'http://localhost:3000/api/v1.0';
var item = 0;


frisby.globalSetup({ // globalSetup is for ALL requests 
  request: {
    headers: { 'Authorization': 'Basic Zm1vcmFudGU6Zm1vcmFudGU=' }
  }
});

// test if server is running
frisby.create('Server running')
    .get(URL)
    .expectStatus(200)
    .toss();

// test GET /categories
frisby.create('GET categories')
    .get(URL + '/categories')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes({
        Error: Boolean,
        Message: String,
        Categories: Array
    })
    .expectJSON({
        Error: false,
        Message: 'Success'
    })
    .toss();

// test POST /categories
frisby.create('POST category')
    .post(URL + '/categories' , {
        slug: "slug-test-jasmine",
        name: "name-test-jasmine"
    })
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes({
        Error: Boolean,
        Message: String,
        Id: Number
    })
    .expectJSON({
        Error: false,
        Message: 'Success'
    })
    .afterJSON (function (response) {
        item = response.Id;
    })
    .toss();

// test PUT /categories/:id
frisby.create('PUT categories')
    .put(URL + '/categories/' + item, {
        slug: "slug-test-jasmine-update",
        name: "name-test-jasmine-update"
    })
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes({
        Error: Boolean,
        Message: String
    })
    .expectJSON({
        Error: false,
        Message: 'Success'
    })
    .toss();

// test DELETE /categories/:id
frisby.create('DELETE categories')
    .delete(URL + '/categories/' + item)
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes({
        Error: Boolean,
        Message: String
    })
    .expectJSON({
        Error: false,
        Message: 'Success'
    })
    .toss();


frisby.create('GET posts')
    .get(URL + '/posts')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes({
        Error: Boolean,
        Message: String,
        Posts: Array
    })
    .expectJSON({
        Error: false,
        Message: 'Success'
    })
    .afterJSON (function (response){
    item = response.Posts[0].id;
    })
    .toss();

frisby.create('GET single post')
    .get(URL + '/posts/' + item)
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes({
        Error: Boolean,
        Message: String,
        Post: Array
    })
    .expectJSON({
        Error: false,
        Message: 'Success'
    })
.toss();

frisby.create('GET post related categories')
    .get(URL + '/posts/' + item + '/categories')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes({
        Error: Boolean,
        Message: String,
        Categories: Array
    })
    .expectJSON({
        Error: false,
        Message: 'Success'
    })
    .toss();

frisby.create('GET post related media')
    .get(URL + '/posts/' + item + '/medias')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes({
        Error: Boolean,
        Message: String,
        Medias: Array
    })
    .expectJSON({
        Error: false,
        Message: 'Success'
    })
    .toss();

frisby.create('GET post related tags')
    .get(URL + '/posts/' + item + '/tags')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes({
        Error: Boolean,
        Message: String,
        Tags: Array
    })
    .expectJSON({
        Error: false,
        Message: 'Success'
    })
    .toss();
