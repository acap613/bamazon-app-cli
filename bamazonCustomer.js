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
    console.log("WELCOME TO BAMAZON!!");

    displayProducts();
});

function displayProducts() {
    var queryDB = "SELECT * FROM products"
    connection.query(queryDB, function(err, data) {
        if (err) throw err
        
        for (var i = 0; i < data.length; i++) {
          
          var strObj = "Item ID: " + data[i].item_id + " || "
          + "Product Name: " + data[i].product_name + " || "
          + "Department: " + data[i].department_name + " || "
          + "Price: $" + data[i].price + " ||"
          + "In Stock: " + data[i].stock_quantity;

          console.log(strObj);
        }

        promptPurchase();
    });       
};


function promptPurchase(){
    inquirer.prompt([
      {
        name: "item_id",
        type: "input",
        message: "Please enter the Item ID you like to purchase",
        validate: inputInt,
        filter: Number

      },
      {
        name: "quantity",
        type: 'input',
        message: 'How many do you need?',
        validate: inputInt,
        filter: Number
      }
    ]).then(function(answer){
        var item = answer.item_id;
        var quantity = answer.quantity;
        
        connection.query("SELECT * FROM products WHERE ?", {item_id: item}, function(err, data){
          if(err) throw err;
          if (data === isNaN) {
            console.log("Invalid item ID");
            displayInventory();
          } else {
            var productData = data[0];
            
            if (quantity <= productData.stock_quantity) {
              console.log("You're in luck!");
              var updateProduct = "UPDATE products SET stock_quantity = " + [productData.stock_quantity - quantity] + " WHERE item_id = " + item;
              connection.query(updateProduct, function(err, data){
                if(err)throw err;
                console.log("Your total will be $"+productData.price*quantity)
                console.log("Your order has been placed, thanks for shopping!");
                connection.end();
              });
            } else {
              console.log("Sorry, not enough in stock. Try again!");
              displayProducts();
            }
          }
        })

    })
}



function inputInt(value) {
	var integer = Number.isInteger(parseInt(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	}
}