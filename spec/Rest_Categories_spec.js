var frisby = require('frisby');
var URL = 'http://localhost:3000/api/v1.0';


frisby.globalSetup({ // globalSetup is for ALL requests 
  request: {
    headers: { 'X-Auth-Token': 'fa8426a0-8eaf-4d22-8e13-7c1b16a9370c' }
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
            .put(URL + '/categories/' + response.Category.insertId, {
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
            .delete(URL + '/categories/' + response.Category.insertId)
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
