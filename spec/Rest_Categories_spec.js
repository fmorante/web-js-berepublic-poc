var frisby = require('frisby');
var URL = 'http://localhost:3000/api/v1.0';


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
        Message: String
    })
    .expectJSON({
        Error: false,
        Message: 'Success'
    })
    .toss();

frisby.create('POST & UPDATE & DELETE single category')
// test POST /categories
    .post(URL + '/categories' , {
        slug: "slug-test-jasmine",
        name: "name-test-jasmine"
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
    .afterJSON (function (response) {
        // test PUT /categories/:id
        frisby.create('UPDATE categories')
            .put(URL + '/categories/' + response.Id, {
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
            .delete(URL + '/categories/' + response.Id)
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
    })
    .toss();

frisby.create('GET posts')
    .get(URL + '/posts')
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
    .afterJSON (function (response){
        frisby.create('GET single post')
            .get(URL + '/posts/' + response.Posts[0].id)
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
        frisby.create('GET post related categories')
            .get(URL + '/posts/' + response.Posts[0].id + '/categories')
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
        frisby.create('GET post related media')
            .get(URL + '/posts/' + response.Posts[0].id + '/medias')
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
        frisby.create('GET post related tags')
            .get(URL + '/posts/' + response.Posts[0].id + '/tags')
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
    })
    .toss();