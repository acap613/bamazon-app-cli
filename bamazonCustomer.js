var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "admin",
    database: "bamazon"

});

// this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale

connection.connect(function(err, res){
    if(err) throw err;
    console.log("you are connected!");

    displayProducts();
});

function displayProducts() {
    connection.query("SELECT * FROM products", function(err, data) {
        if (err) throw err
             
        data.forEach( product => {
          console.log(`${product.item_id} - ${product.product_name}, PRICE: $${product.price}`);
        });
    
        
        // askPurchaseQuestions();
      });
}

// function inputID(value) {
// 	var integer = Number.isInteger(parseFloat(value));
// 	var sign = Math.sign(value);

// 	if (integer && (sign === 1)) {
// 		return true;
// 	} else {
// 		return 'Please enter a whole non-zero number.';
// 	}
// }