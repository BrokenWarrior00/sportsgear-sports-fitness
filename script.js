alert("JavaScript is working!");

let products = [
    {id: 1, name: "Running Shoes", category: "Footwear", price: 2499, image: "images/running-shoes.jpg"},
{id: 2, name: "Football Cleats", category: "Footwear", price: 1999, image: "images/football-cleats.jpg"},
{id: 3, name: "Basketball Shoes", category: "Footwear", price: 2799, image: "images/basketball-shoes.jpg"},
{id: 4, name: "Training Shoes", category: "Footwear", price: 1799, image: "images/training-shoes.jpg"},
{id: 5, name: "Casual Sneakers", category: "Footwear", price: 1499, image: "images/casual-sneakers.jpg"},

{id: 6, name: "Football Jersey", category: "Apparel", price: 899, image: "images/football-jersey.jpg"},
{id: 7, name: "Training Top", category: "Apparel", price: 699, image: "images/training-top.jpg"},
{id: 8, name: "Sports Shorts", category: "Apparel", price: 499, image: "images/sports-shorts.jpg"},
{id: 9, name: "Sports Hoodie", category: "Apparel", price: 1299, image: "images/sports-hoodie.jpg"},
{id: 10, name: "Compression Wear", category: "Apparel", price: 799, image: "images/compression-wear.jpg"},

{id: 11, name: "Dumbbells", category: "Gym Equipment", price: 1499, image: "images/dumbbells.jpg"},
{id: 12, name: "Resistance Bands", category: "Gym Equipment", price: 399, image: "images/resistance-bands.jpg"},
{id: 13, name: "Yoga Mat", category: "Gym Equipment", price: 599, image: "images/yoga-mat.jpg"},
{id: 14, name: "Workout Bench", category: "Gym Equipment", price: 3499, image: "images/workout-bench.jpg"},
{id: 15, name: "Pull-up Bar", category: "Gym Equipment", price: 999, image: "images/pull-up-bar.jpg"},

{id: 16, name: "Football", category: "Team Sports", price: 799, image: "images/football.jpg"},
{id: 17, name: "Basketball", category: "Team Sports", price: 899, image: "images/basketball.jpg"},
{id: 18, name: "Cricket Bat", category: "Team Sports", price: 1599, image: "images/cricket-bat.jpg"},
{id: 19, name: "Tennis Racket", category: "Team Sports", price: 1299, image: "images/tennis-racket.jpg"},
{id: 20, name: "Sports Bag", category: "Team Sports", price: 999, image: "images/sports-bag.jpg"}
];


// Load saved information from the browser

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];


// Display products on the page

function showProducts() {
    let list = document.getElementById("productList");

    let search = document.getElementById("searchBox").value.toLowerCase();
    let category = document.getElementById("categoryBox").value;

    list.innerHTML = "";

    for (let i = 0; i < products.length; i++) {

        let name = products[i].name.toLowerCase();

        if ((name.includes(search)) &&
            (category == "All" || products[i].category == category)) {

            list.innerHTML += `
            <div class="product">

            <img src="${products[i].image}"
            alt="${products[i].name}">

            <h3>${products[i].name}</h3>

            <p>Category: ${products[i].category}</p>

            <p>Price: ₹${products[i].price}</p>

            <label>Choose Size</label>

            <select id="size${products[i].id}">
            <option value="Standard">Standard</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            </select>

            <button onclick="addToCart(${products[i].id})">
            Add to Cart
            </button>

            <button onclick="addToWishlist(${products[i].id})">
            Add to Wishlist
            </button>

            <button onclick="giveReview()">
            Give Review
            </button>

            </div>
            `;
            }
    }

    if (list.innerHTML == "") {
        list.innerHTML = "<p>No products found.</p>";
    }
}


// Select a category

function showCategory(category) {
    document.getElementById("categoryBox").value = category;
    showProducts();

    document.getElementById("products").scrollIntoView();
}


// Add product to cart

function addToCart(id) {

    let size = document.getElementById("size" + id).value;
    let found = false;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id && cart[i].size == size) {
            cart[i].quantity++;
            found = true;
        }
    }

    if (found == false) {
        cart.push({
            id: id,
            size: size,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    showCart();

    alert("Product added to cart!");
}


// Show cart items

function showCart() {

    let list = document.getElementById("cartList");
    let total = 0;

    list.innerHTML = "";

    if (cart.length == 0) {
        list.innerHTML = "<p>Your cart is empty.</p>";
    }

    for (let i = 0; i < cart.length; i++) {

        let product = products[cart[i].id - 1];

        let price = product.price * cart[i].quantity;
        total = total + price;

        list.innerHTML += `
        <div class="cart-item">

        <p>${product.name}</p>

        <p>Size: ${cart[i].size}</p>

        <p>Quantity: ${cart[i].quantity}</p>

        <p>Price: ₹${price}</p>

        <button onclick="changeQuantity(${i}, -1)">-</button>

        <button onclick="changeQuantity(${i}, 1)">+</button>

        <button onclick="removeItem(${i})">Remove</button>

        </div>
        `;
    }

    document.getElementById("total").innerHTML = "Total: ₹" + total;
}


// Change quantity

function changeQuantity(index, amount) {

    cart[index].quantity = cart[index].quantity + amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    showCart();
}


// Remove item from cart

function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    showCart();
}


// Add product to wishlist

function addToWishlist(id) {

    let found = false;

    for (let i = 0; i < wishlist.length; i++) {
        if (wishlist[i] == id) {
            found = true;
        }
    }

    if (found == false) {
        wishlist.push(id);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    showWishlist();

    alert("Added to wishlist!");
}


// Display wishlist

function showWishlist() {

    let list = document.getElementById("wishlistList");

    list.innerHTML = "";

    if (wishlist.length == 0) {
        list.innerHTML = "<p>Your wishlist is empty.</p>";
    }

    for (let i = 0; i < wishlist.length; i++) {

        let product = products[wishlist[i] - 1];

        list.innerHTML += `
        <div class="cart-item">

        <img src="${product.image}"
        alt="${product.name}"
        width="100">

        <p>${product.name}</p>

        <p>Price: ₹${product.price}</p>

        <button onclick="removeWishlist(${wishlist[i]})">
        Remove
        </button>

        </div>
        `;
    }
}


// Remove from wishlist

function removeWishlist(id) {

    for (let i = 0; i < wishlist.length; i++) {
        if (wishlist[i] == id) {
            wishlist.splice(i, 1);
            break;
        }
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    showWishlist();
}


// Simple review feature

function giveReview() {

    let rating = prompt("Give a rating from 1 to 5");
    let review = prompt("Write your review");

    if (rating >= 1 && rating <= 5 && review != null) {
        alert("Thank you for your review!");
    } else {
        alert("Please enter a rating between 1 and 5.");
    }
}


// Place order

document.getElementById("checkoutForm").onsubmit = function(event) {

    event.preventDefault();

    if (cart.length == 0) {
        alert("Your cart is empty!");
        return;
    }

    let name = document.getElementById("customerName").value;
    let email = document.getElementById("customerEmail").value;
    let phone = document.getElementById("customerPhone").value;
    let address = document.getElementById("customerAddress").value;
    let payment = document.getElementById("payment").value;

    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        let product = products[cart[i].id - 1];

        total = total + product.price * cart[i].quantity;
    }

    let number = Number(localStorage.getItem("orderNumber")) || 101;
    let id = "SG" + number;

    localStorage.setItem("orderNumber", number + 1);

    let order = {
        id: id,
        name: name,
        email: email,
        phone: phone,
        address: address,
        payment: payment,
        total: total,
        status: "Order Placed"
    };

    orders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));

    cart = [];

    localStorage.setItem("cart", JSON.stringify(cart));

    showCart();
    showOrders();

    document.getElementById("orderMessage").innerHTML =
    "Order placed successfully! Your Order ID is " + id +
    ". This is a demo payment system.";

    document.getElementById("checkoutForm").reset();
};


// Track order

function trackOrder() {

    let id = document.getElementById("orderId").value.trim();
    let found = false;

    let list = document.getElementById("trackingMessage");

    list.innerHTML = "";

    for (let i = 0; i < orders.length; i++) {

        if (orders[i].id.toUpperCase() == id.toUpperCase()) {

            list.innerHTML =
            "Order ID: " + orders[i].id +
            "<br>Name: " + orders[i].name +
            "<br>Total: ₹" + orders[i].total +
            "<br>Payment: " + orders[i].payment +
            "<br>Status: " + orders[i].status;

            found = true;
            break;
        }
    }

    if (found == false) {
        list.innerHTML =
        "Order not found. Please enter a valid Order ID.";
    }
}


// Display previous orders

function showOrders() {

    let list = document.getElementById("orderHistory");

    list.innerHTML = "";

    for (let i = 0; i < orders.length; i++) {

        list.innerHTML += `
        <p>
        Order ID: ${orders[i].id}
        - ₹${orders[i].total}
        - ${orders[i].status}
        </p>
        `;
    }
}


// Simple login and registration demo

document.getElementById("accountForm").onsubmit = function(event) {

    event.preventDefault();

    let name = document.getElementById("userName").value;
    let email = document.getElementById("userEmail").value;

    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);

    document.getElementById("accountMessage").innerHTML =
    "Welcome " + name + "! Your demo account is saved.";
};


//contactformdemo

document.getElementById("contactForm").onsubmit = function(event) {

    event.preventDefault();

    document.getElementById("contactMessage").innerHTML =
    "Thank you for contacting SportGear!";

    document.getElementById("contactForm").reset();
};


//Starts website

showProducts();
showCart();
showWishlist();
showOrders();
