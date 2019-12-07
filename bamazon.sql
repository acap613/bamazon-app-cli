CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
    ("Diablo IV", "video games", 59.99, 100),
    ("Mechwarrior 5: Mercenaries", "video games", 54.99, 50),
    ("Borderlands 3", "video games", 49.99, 200),
    ("20lbs. Puppy Chow", "pet supplies", 29.99, 24),
    ("Nylon Chicken Bone", "pet supplies", 4.98, 5),
    ("Ruff'n'Tuff Dog Bed(M)", "pet supplies", 34.99, 12),
    ("Ruff'n'Tuff Dog Bed(S)", "pet supplies", 24.99, 18),
    ("Ruff'n'Tuff Dog Bed(L)", "pet supplies", 42.99, 7),
    ("10oz. Cafe Bustello", "groceries", 3.49, 504),
    ("12 Clif Bar (Apricot)", "groceries", 18.99, 39)


