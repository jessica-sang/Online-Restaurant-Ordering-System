// showing navbar when click menu on mobile view
const mobile = document.querySelector('.menu-toggle');
const mobileLink = document.querySelector('.sidebar');

mobile.addEventListener("click", function(){
    mobile.classList.toggle("is-active");
    mobileLink.classList.toggle("active");
})

// close menu when click
mobileLink.addEventListener("click", function(){
    const menuBars = document.querySelector(".is-active");
    if(window.innerWidth<=768 && menuBars) {
        mobile.classList.toggle("is-active");
        mobileLink.classList.toggle("active");
    }
})

// move the menu to right and left when click back and next
var step = 100;
var stepFilter = 60;
var scrolling = true;

$(".back").bind("click", function(e){
    e.preventDefault();
    $(".highlight-wrapper").animate({
        scrollLeft: "-=" + step + "px"
    });
});

$(".next").bind("click", function(e){
    e.preventDefault();
    $(".highlight-wrapper").animate({
        scrollLeft: "+=" + step + "px"
    });
})


// when click back and next on menu filter
$(".back-menus").bind("click", function(e){
    e.preventDefault();
    $(".filter-wrapper").animate({
        scrollLeft: "-=" + stepFilter + "px"
    });
});

$(".next-menus").bind("click", function(e){
    e.preventDefault();
    $(".filter-wrapper").animate({
        scrollLeft: "+=" + stepFilter + "px"
    });
});



// for shopping cart part
// for cart popup
function toggleCartPopup() {
    const cartPopup = document.getElementById('cart-popup');
    cartPopup.classList.toggle('active');
}

// for close cart popup
function closeCart() {
    const cartPopup = document.getElementById('cart-popup');
    cartPopup.classList.remove('active');
}

// for add to cart button
function addToCart(itemName, itemPrice) {
    const cartItems = document.getElementById('cart-items').getElementsByTagName('tbody')[0];
    const existingItem = Array.from(cartItems.getElementsByTagName('tr')).find(item=>item.cells[0].textContent === itemName);
    if(existingItem) {
        const itemCount = parseInt(existingItem.querySelector('.item-count').textContent) + 1;
        existingItem.querySelector('.item-count').textContent = itemCount;

        const itemTotal = parseFloat(existingItem.querySelector('.item-total').textContent) + parseFloat(itemPrice);
        existingItem.querySelector('.item-total').textContent = itemTotal.toFixed(2);
    }
    else {
        const newRow = cartItems.insertRow();
        newRow.innerHTML = `
        <td>${itemName}</td>
        <td class='item-count'>1</td>
        <td class='item-price'>${itemPrice}</td>
        <td class='item-total'>${itemPrice}</td>
        `;
    }
    updateCartCountAndTotal();
}

// update cart count and total
function updateCartCountAndTotal() {
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const cartItems = document.querySelectorAll('#cart-items tbody tr');
    let totalCount = 0;
    let total = 0;
    cartItems.forEach(item => {
        const itemCount = parseInt(item.querySelector('.item-count').textContent);
        const itemTotal = parseFloat(item.querySelector('.item-total').textContent);
        totalCount += itemCount;
        total += itemTotal;
    });
    cartCount.textContent = totalCount;
    cartTotal.textContent = total.toFixed(2);
}

// checkout modal box
function checkOut() {
    document.getElementById('checkout-modal').style.display = 'block';
};

document.querySelector('.close').addEventListener('click',() => {
    document.getElementById('checkout-modal').style.display = 'none';
});

window.addEventListener('click', (event) => {
    const modal = document.getElementById('checkout-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// order successfully modal box
function order() {
    document.getElementById('checkout-modal').style.display = 'none';
    document.getElementById('order-modal').style.display = 'flex';

    setTimeout(function() {
        document.getElementById('order-modal').style.display = 'none';
        location.reload();
    }, 3000);
}