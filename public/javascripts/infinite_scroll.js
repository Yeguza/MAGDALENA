// get the data attribute from the product-list-container

let product_skip_number = 2; //changethis value when i want some number of products

let category = $("#product-list-container").attr("data-category");
console.log(category);

let total_product_count = $("#product-list-container").attr("data-total-products");

// initialize infinity scroll
$('#product-list-container').infiniteScroll({
	path: function(){
		// make an AJAX request when the skip number is less than the total number of products in the server
		if (product_skip_number < total_product_count) {
			return "../loading/" + category + "/" + product_skip_number;
		}
	},
	append: '.product-container',
	scrollThreshold: 5,
	status: '.page-load-status',
	history: false
}).on( 'append.infiniteScroll', function( event, response, path, items ) {
    product_skip_number += 2;
    console.log(product_skip_number);
});

