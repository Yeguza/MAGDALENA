// require the router object
let express = require('express');
let router = express.Router();

// require the controller modules
let admin = require("../controllers/admin");
let products = require("../controllers/products");
let upload = require("../controllers/upload");

// KUMENOGA ROUTES
// this routes handles all request to kumenoga.com
/* *************************************************************************************** */


// get the home page
router.get("/", products.index);

// POST request to upload products to the server on post
router.post("/upload", upload.upload_product);

//GET request to get the products from the respective category
router.get('/category/:category_name', products.get_products_from_category);

// An ajax GET  request for infinite scrolling
router.get('/loading/:category_name/:product_skip_number', products.infinity_scroll_products);

// get product detail
router.get("/product/:product_id", products.get_product_detail);

// GET request to get file upload form
router.get("/upload", upload.get_upload_page);

//GET request for team page
router.get("/team", products.get_team_page);

module.exports = router;
