
function login() {

    // get input values
    let enteredEmail = document.getElementById("email").value;
    let enteredPassword = document.getElementById("password").value;

    // get stored user data
    let storedEmail = localStorage.getItem("email");
    let storedPassword = localStorage.getItem("password");

    // error message element
    let errorMsg = document.getElementById("error");

    // check if user exists
    if (storedEmail === null) {
        errorMsg.innerText = "Invalid user. Please sign up first.";
    }
    else if (enteredEmail !== storedEmail) {
        errorMsg.innerText = "Invalid user email.";
    }
    else if (enteredPassword !== storedPassword) {
        errorMsg.innerText = "Wrong password.";
    }
    else {
        localStorage.setItem("isLoggedIn", "true");
         window.location.href = "index.html";
    }

}


function signup(){

    let name = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;
    let cpass = document.getElementById("cpass").value;
    let msg = document.getElementById("msg");

    // empty check
    if(name === "" || email === "" || pass === "" || cpass === ""){
        msg.innerText = "All fields are required";
        msg.style.color = "red";
        return;
    }

    // password match check
    if(pass !== cpass){
        msg.innerText = "Passwords do not match";
        msg.style.color = "red";
        return;
    }

    // SAVE DATA 🔥
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("password", pass);

    msg.innerText = "Signup successful! Redirecting to login...";
    msg.style.color = "green";

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);
}


function addToCart(productName, productPrice){

    // get existing cart
    let cart = localStorage.getItem("cart");

    // if cart empty, create new array
    if(cart === null){
        cart = [];
    }else{
        cart = JSON.parse(cart);
    }

    // check if product already exists
    let found = false;

    for(let i = 0; i < cart.length; i++){
        if(cart[i].name === productName){
            cart[i].qty += 1;
            found = true;
            break;
        }
    }

    // if new product
    if(!found){
        cart.push({
            name: productName,
            price: productPrice,
            qty: 1
        });
    }

    // save back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(productName + " added to cart 🛒");
}

// SHOW CART ITEMS
function loadCart(){

    let cart = localStorage.getItem("cart");
    let cartItemsDiv = document.getElementById("cart-items");
    let totalDiv = document.getElementById("total");

    // empty cart
    if(cart === null || JSON.parse(cart).length === 0){
        cartItemsDiv.innerHTML = "<p>Your cart is empty 🛒</p>";
        totalDiv.innerText = "Total: ₹0";
        return;
    }

    cart = JSON.parse(cart);
    cartItemsDiv.innerHTML=" ";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.qty;
        cartItemsDiv.innerHTML += `
    <div class="cart-item">
        <p><strong>${item.name}</strong></p>
        <p>Price: ₹${item.price}</p>

        <div class="qty-box">
            <button onclick="decreaseQty(${index})">−</button>
            <span>${item.qty}</span>
            <button onclick="increaseQty(${index})">+</button>
        </div>

        <button onclick="removeItem(${index})" class="remove-btn">
            Remove
        </button>
    </div>
`;

   
    });

    totalDiv.innerText = "Total: ₹" + total;
}
function removeItem(index){

    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);   // remove item

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();   // reload cart
}
function increaseQty(index){
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart[index].qty += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}
function decreaseQty(index){
    let cart = JSON.parse(localStorage.getItem("cart"));

    if(cart[index].qty > 1){
        cart[index].qty -= 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function checkout(){

    let cart = localStorage.getItem("cart");

    // cart empty check
    if(cart === null || JSON.parse(cart).length === 0){
        alert("Your cart is empty 🛒");
        return;
    }

    // clear cart after checkout
    localStorage.removeItem("cart");

    // go to success page
    window.location.href = "success.html";
}

// SEARCH FILTER
let searchInput = document.getElementById("search");

if(searchInput){
    searchInput.addEventListener("keyup", function(){

        let searchValue = searchInput.value.toLowerCase();
        let products = document.getElementsByClassName("product");

        for(let i = 0; i < products.length; i++){

            let productText = products[i].innerText.toLowerCase();

            if(productText.includes(searchValue)){
                products[i].style.display = "inline-block";
            }else{
                products[i].style.display = "none";
            }
        }
    });
}



if(window.location.pathname.includes("cart.html")){
    loadCart();
}

