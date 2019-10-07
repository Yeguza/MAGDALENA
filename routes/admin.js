// admin.kumenoga.com routes
/****** this module handles all the request to admin.kumenoga.com subdomain******/

let admin = require('../controllers/admin');
let express = require("express");
let router = express.Router();

// GET request for the sign-in page
router.get("/admin", admin.get_signin_page);

// POST request for posting admin credentials for authentication
// respond with the admin panel if authentication succeeded
router.post("/admin/post", admin.post_admin_credentials);

// GET request to delete the product
router.get("admin/product/delete", admin.delete_product);

// GET request to show all products on admin panel
router.get("/admin/products", admin.show_product_list);

// GET request to show sellers list on admin panel
router.get("/admin/sellers", admin.show_sellers);

// GET request to show seller details
router.get("admin/seller/detail", admin.show_seller_detail);

// export my router object
module.exports = router;
