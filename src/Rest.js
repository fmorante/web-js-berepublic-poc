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
    res.json({"Message" : "I'm alive!"});
  });

  /**
   * @api {get} /categories List all categories
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
   * @api {post} /categories Create category
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
   * @api {put} /categories/:id Update category
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


  /**
   * @api {delete} /categories/:id Delete category
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
        { replacements: { id: req.params.id }, type: sequelize.QueryTypes.DELETE })
        .then(function(rows){
          res.json({"Error" : false, "Message" : "Success"});
        })
        .catch(function(err){
          res.json({"Error" : true, "Message" : err});
        });
  });

    /**
     * @api {get} /posts List all posts
     * @apiVersion 1.0.0
     * @apiGroup Posts
     * @apiError {Boolean} Error true
     * @apiError {String} Message Error message
     * @apiSuccess {Boolean} Error false
     * @apiSuccess {String} Message "Success"
     * @apiSuccess {Array} Posts posts array
     * @apiSuccessExample Success-Response:
     * {
     * "Error": false,
     * "Message": "Success",
     * "Posts": [
     * {
     *  "id": 22,
     *  "publication_date": "2015-07-09T00:00:00.000Z",
     *  "slug": "sobrejackdaniels",
     * "type": "post",
     *  "title_home": "EL AUTÉNTICO TENNESSEE WHISKEY",
     *  "description_home": "",
     *  "link": "",
     *  "title": "JACK DANIEL’S OLD Nº7: EL AUTÉNTICO TENNESSEE WHISKEY",
     *  "subtitle": "",
     *  "description": "<p>Jack\r\nDaniel's se elabora en la destilería americana más antigua en Lynchburg,\r\nTennessee (EEUU) desde 1866. Su carácter independiente y genuino, unido a su\r\nsabor inconfundible, lo han convertido en el whiskey más vendido del mundo. Hecho\r\ncon agua de manantial pura y filtrado a través de 3 metros de carbón de arce,\r\nesta elaboración única lo diferencia de otros whiskeys americanos y bourbons.\r\nEl auténtico Tennessee Whiskey madura en barriles nuevos de roble americano\r\nfabricados por nuestros artesanos.</p>\r\n\r\n<p>A\r\ntravés de la historia, Jack Daniel’s se ha convertido en un símbolo de calidad,\r\nconsiguiendo 7 medallas de oro y convirtiendo su botella en todo un icono. Su\r\ncaracterística etiqueta y su famoso logotipo “Old Nº 7”, cuyo significado sigue\r\nsiendo hoy en día un misterio, son reconocidos mundialmente.</p>",
     *  "quote": "",
     *  "quote_author": "",
     *  "is_promo": "no",
     *  "promo_type": "link",
     *  "promo_link": "",
     *  "promo_start_date": "0000-00-00",
     *  "promo_end_date": "0000-00-00",
     *  "created_at": "2015-07-13T06:48:40.000Z",
     *  "updated_at": "2015-07-22T11:03:39.000Z"
     * },
     * {
     *  "id": 23,
     *  "publication_date": "2015-07-01T00:00:00.000Z",
     *  "slug": "julio-2015",
     *  "type": "banner",
     *  "title_home": "",
     *  "description_home": "",
     *  "link": "",
     *  "title": "",
     *  "subtitle": "",
     *  "description": "",
     *  "quote": "",
     *  "quote_author": "",
     *  "is_promo": "no",
     *  "promo_type": "link",
     *  "promo_link": "",
     *  "promo_start_date": "0000-00-00",
     *  "promo_end_date": "0000-00-00",
     *  "created_at": "2015-07-13T07:04:26.000Z",
     *  "updated_at": "2015-07-13T08:03:59.000Z"
     * }
     *    ]
     * }
     */
    router.get("/posts",function(req,res){
        var query = 'SELECT * from post';
        connection
            .query(query, { type: sequelize.QueryTypes.SELECT })
            .then(function(rows){
                res.json({"Error" : false, "Message" : "Success", "Posts" : rows});
            })
            .catch(function(err){
                res.json({"Error" : true, "Message" : err});
            });
    });

    /**
     * @api {get} /posts/:id List single post
     * @apiVersion 1.0.0
     * @apiGroup Posts
     * @apiError {Boolean} Error true
     * @apiError {String} Message Error message
     * @apiSuccess {Boolean} Error false
     * @apiSuccess {String} Message "Success"
     * @apiSuccess {JSON} Post Single post
     * @apiSuccessExample Success-Response:
     * {
     * "Error": false,
     * "Message": "Success",
     * "Post": [
     * {
     *  "id": 22,
     *  "publication_date": "2015-07-09T00:00:00.000Z",
     *  "slug": "sobrejackdaniels",
     * "type": "post",
     *  "title_home": "EL AUTÉNTICO TENNESSEE WHISKEY",
     *  "description_home": "",
     *  "link": "",
     *  "title": "JACK DANIEL’S OLD Nº7: EL AUTÉNTICO TENNESSEE WHISKEY",
     *  "subtitle": "",
     *  "description": "<p>Jack\r\nDaniel's se elabora en la destilería americana más antigua en Lynchburg,\r\nTennessee (EEUU) desde 1866. Su carácter independiente y genuino, unido a su\r\nsabor inconfundible, lo han convertido en el whiskey más vendido del mundo. Hecho\r\ncon agua de manantial pura y filtrado a través de 3 metros de carbón de arce,\r\nesta elaboración única lo diferencia de otros whiskeys americanos y bourbons.\r\nEl auténtico Tennessee Whiskey madura en barriles nuevos de roble americano\r\nfabricados por nuestros artesanos.</p>\r\n\r\n<p>A\r\ntravés de la historia, Jack Daniel’s se ha convertido en un símbolo de calidad,\r\nconsiguiendo 7 medallas de oro y convirtiendo su botella en todo un icono. Su\r\ncaracterística etiqueta y su famoso logotipo “Old Nº 7”, cuyo significado sigue\r\nsiendo hoy en día un misterio, son reconocidos mundialmente.</p>",
     *  "quote": "",
     *  "quote_author": "",
     *  "is_promo": "no",
     *  "promo_type": "link",
     *  "promo_link": "",
     *  "promo_start_date": "0000-00-00",
     *  "promo_end_date": "0000-00-00",
     *  "created_at": "2015-07-13T06:48:40.000Z",
     *  "updated_at": "2015-07-22T11:03:39.000Z"
     * }
     * ]
     * }
     */
    router.get("/posts/:id",function(req,res){
        var query = 'SELECT * FROM post WHERE id = :id';
        connection
            .query(query,
            { replacements: { id: req.params.id }, type: sequelize.QueryTypes.SELECT })
            .then(function(rows){
                res.json({"Error" : false, "Message" : "Success", "Post" : rows});
            })
            .catch(function(err){
                res.json({"Error" : true, "Message" : err});
            });
    });

    /**
     * @api {get} /posts/:id/categories List single post related categories
     * @apiVersion 1.0.0
     * @apiGroup Posts
     * @apiError {Boolean} Error true
     * @apiError {String} Message Error message
     * @apiSuccess {Boolean} Error false
     * @apiSuccess {String} Message "Success"
     * @apiSuccess {Array} Categories categories array
     * @apiSuccessExample Success-Response:
     * {
     * "Error": false,
     * "Message": "Success",
     * "Categories": [
     * {
     *  "id": 22,
     *  "slug": "slug0",
     *  "name": "Test name slug0",
     *  "created_at": "2015-01-13T06:46:41.000Z",
     *  "updated_at": "2015-02-03T03:24:04.000Z"
     *  },
     * {
     *  "id": 23,
     *  "slug": "slug2",
     *  "name": "Test Name Slug",
     *  "created_at": "2015-01-13T06:46:41.000Z",
     *  "updated_at": "2015-02-03T03:24:04.000Z"
     *  }
     * ]
     * }
     */
    router.get("/posts/:id/categories",function(req,res){
        var query = 'SELECT c.* FROM category c, post_has_category h, post p WHERE c.id = h.category_id AND p.id = h.post_id AND p.id = :id';
        connection
            .query(query,
            { replacements: { id: req.params.id }, type: sequelize.QueryTypes.SELECT })
            .then(function(rows){
                res.json({"Error" : false, "Message" : "Success", "Categories" : rows});
            })
            .catch(function(err){
                res.json({"Error" : true, "Message" : err});
            });
    });

    /**
     * @api {get} /posts/:id/medias List single post related medias
     * @apiVersion 1.0.0
     * @apiGroup Posts
     * @apiError {Boolean} Error true
     * @apiError {String} Message Error message
     * @apiSuccess {Boolean} Error false
     * @apiSuccess {String} Message "Success"
     * @apiSuccess {Array} Medias medias array
     * @apiSuccessExample Success-Response:
     * {
     * "Error": false,
     * "Message": "Success",
     * "Medias": [
     * {
     *  "id": 1,
     *  "post_id": 22,
     *  "source": "/admin/web/uploaded/COVER_jackdanieln7_55a35f48219fa.png",
     *  "image_source": "/admin/web/uploaded/COVER_jackdanieln7_55a35f48219fa.png",
     *  "type": "image",
     *  "style": "home",
     *  "link": "",
     *  "created_at": "2015-01-13T06:46:41.000Z",
     *  "updated_at": "2015-02-03T03:24:04.000Z"
     *  },
     * {
     *  "id": 2,
     *  "post_id": 22,
     *  "source": "/admin/web/uploaded/fichajd_7_55a361f11847f.png"",
     *  "image_source": "/admin/web/uploaded/fichajd_7_55a361f11847f.png"",
     *  "type": "image",
     *  "style": "gallery",
     *  "link": null,
     *  "created_at": "2015-01-13T06:46:41.000Z",
     *  "updated_at": "2015-02-03T03:24:04.000Z"
     *  }
     * ]
     * }
     */

    router.get("/posts/:id/medias",function(req,res){
        var query = 'SELECT m.* FROM post_media m, post p WHERE p.id = m.post_id AND p.id = :id';
        connection
            .query(query,
            { replacements: { id: req.params.id }, type: sequelize.QueryTypes.SELECT })
            .then(function(rows){
                res.json({"Error" : false, "Message" : "Success", "Medias" : rows});
            })
            .catch(function(err){
                res.json({"Error" : true, "Message" : err});
            });
    });

    /**
     * @api {get} /posts/:id/tags List single post related tags
     * @apiVersion 1.0.0
     * @apiGroup Posts
     * @apiError {Boolean} Error true
     * @apiError {String} Message Error message
     * @apiSuccess {Boolean} Error false
     * @apiSuccess {String} Message "Success"
     * @apiSuccess {Array} Tags tags array
     * @apiSuccessExample Success-Response:
     * {
     * "Error": false,
     * "Message": "Success",
     * "Tags": [
     * {
     *  "id": 1,
     *  "slug": "tag1",
     *  "created_at": "2015-01-13T06:46:41.000Z",
     *  "updated_at": "2015-02-03T03:24:04.000Z"
     *  },
     * {
     *  "id": 2,
     *  "slug": "tag2",
     *  "created_at": "2015-01-13T06:46:41.000Z",
     *  "updated_at": "2015-02-03T03:24:04.000Z"
     *  }
     * ]
     * }
     */

    router.get("/posts/:id/tags",function(req,res){
        var query = 'SELECT t.* FROM tag t, post_has_tag h, post p WHERE t.id = h.tag_id AND p.id = h.post_id AND p.id = :id';
        connection
            .query(query,
            { replacements: { id: req.params.id }, type: sequelize.QueryTypes.SELECT })
            .then(function(rows){
                res.json({"Error" : false, "Message" : "Success", "Tags" : rows});
            })
            .catch(function(err){
                res.json({"Error" : true, "Message" : err});
            });
    });




}

module.exports = REST_ROUTER;