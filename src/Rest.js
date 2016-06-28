var sequelize = require('sequelize');

function REST_ROUTER(router,connection,md5) {
  var self = this;
  self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {

// Entity category mapping
  var Category = connection.define('Category', {
    slug: sequelize.STRING,
    name: sequelize.STRING
  });

  router.get("/",function(req,res){
    res.json({"Message" : "Hello World !"});
  });

  /**
   * @api {get} /categories Get all categories data
   * @apiVersion 1.0.0
   * @apiGroup Categories
   * @apiError {Boolean} Error true
   * @apiError {String} Message Error message
   * @apiSuccess {Boolean} Error false
   * @apiSuccess {String} Message "Success"
   * @apiSuccess {Array} Category categories array
   * @apiSuccessExample Success-Response:
   * {
   *  "Error": false,
   *  "Message": "Success",
   *  "Category": [
   *    {
   *      "id": 1,
   *      "slug": "slug-example-1",
   *      "name": "Example1",
   *      "created_at": "2015-01-13T05:46:41.000Z",
   *      "updated_at": "2015-02-03T02:24:04.000Z"
   *    },
   *    {
   *      "id": 2,
   *      "slug": "slug-example-2",
   *      "name": "Example2",
   *      "created_at": "2015-01-13T05:46:57.000Z",
   *      "updated_at": "2015-01-13T05:46:57.000Z"
   *    }
   *    ]
   * }
   */
  router.get("/categories",function(req,res){

    var query = 'SELECT * from category';
    connection
        .query(query, { type: sequelize.QueryTypes.SELECT })
        .then(function(rows){
          res.json({"Error" : false, "Message" : "Success", "Category" : rows});
        })
        .catch(function(err){
          res.json({"Error" : true, "Message" : err});
        });
  });

  /**
   * @api {post} /categories Insert new category
   * @apiVersion 1.0.0
   * @apiGroup Categories
   * @apiParam {String} Slug slug term
   * @apiParam {String} Name descriptive name for category
   * @apiError {Boolean} Error true
   * @apiError {String} Message Error message
   * @apiSuccess {Boolean} Error false
   * @apiSuccess {String} Message "Success"
   * @apiSuccessExample Success-Response:
   * {
   *  "Error": false,
   *  "Message": "Success",
   *  "Id": 1
   * }
   */
  router.post("/categories",function(req,res){
    var query = "INSERT INTO category (slug, name, created_at, updated_at) VALUES (:slug,:name,NOW(),NOW())";
    connection
        .query(query,
        { replacements: { slug: req.body.slug, name: req.body.name }, type: sequelize.QueryTypes.UPDATE })
        .then(function(rows){
          res.json({"Error" : false, "Message" : "Success", "Id" : rows});
        })
        .catch(function(err){
          res.json({"Error" : true, "Message" : err});
        });
  });

  // /api/v1.0/categories      POST         Insert new category
  /**
   * @api {put} /categories/:id Update basic category info for category id :id
   * @apiVersion 1.0.0
   * @apiGroup Categories
   * @apiParam {String} Slug slug term
   * @apiParam {String} Name descriptive name for category
   * @apiError {Boolean} Error true
   * @apiError {String} Message Error message
   * @apiSuccess {Boolean} Error false
   * @apiSuccess {String} Message "Success"
   * @apiSuccessExample Success-Response:
   * {
   *  "Error": false,
   *  "Message": "Success"
   * }
   */
  router.put("/categories/:id",function(req,res){
    var query = "UPDATE category SET slug = :slug, name = :name WHERE id = :id";
    connection
        .query(query,
        { replacements: { slug: req.body.slug, name: req.body.name, id: req.params.id }, type: sequelize.QueryTypes.UPDATE })
        .then(function(rows){
          res.json({"Error" : false, "Message" : "Success"});
        })
        .catch(function(err){
          res.json({"Error" : true, "Message" : err});
        });
  });


  // /api/v1.0/categories      POST         Insert new category
  /**
   * @api {delete} /categories/:id Detele category id :id
   * @apiVersion 1.0.0
   * @apiGroup Categories
   * @apiError {Boolean} Error true
   * @apiError {String} Message Error message
   * @apiSuccess {Boolean} Error false
   * @apiSuccess {String} Message "Success"
   * @apiSuccessExample Success-Response:
   * {
   *  "Error": false,
   *  "Message": "Success"
   * }
   */
  router.delete("/categories/:id",function(req,res){
    var query = "DELETE FROM category WHERE id = :id";
    connection
        .query(query,
        { replacements: { id: req.params.id }, type: sequelize.QueryTypes.UPDATE })
        .then(function(rows){
          res.json({"Error" : false, "Message" : "Success"});
        })
        .catch(function(err){
          res.json({"Error" : true, "Message" : err});
        });
  });

}

module.exports = REST_ROUTER;