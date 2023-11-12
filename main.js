const products = [
    {
        image: 'https://images.sello.io/products/acc/52865/90905138/9844c8dc0eddd0fe2e3f1145f9be1a7f.jpg',
        title: 'Z Flip Foldable Mobile',
        price: '$120.00',
    },
    {
        image: 'https://www.apple.com/newsroom/images/product/airpods/standard/Apple-AirPods-Pro-2nd-gen-hero-220907_big.jpg.large.jpg',
        title: 'AirPods Pro',
        price: '$60.00',
    }
];

function renderProducts() {
    const productList = document.getElementById('productlist');

    products.forEach((item, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <h2> ${item.title}</h2>
            <p>Qiymet: ${item.price}</p>
            <button onclick="addToCart(${index})">Sebete elave et</button>
        `;
        productList.appendChild(div);
    });
}
function addToCart(productIndex) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(products[productIndex]);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}


function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function clearCart() {
    localStorage.removeItem('cart');

    displayCart();
}

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartList = document.getElementById('cart');
    const totalItemCount = document.getElementById('totalCount');
    const totalPrice = document.getElementById('totalPrice');
    cartList.innerHTML = '';

    let itemCount = 0;
    let cartPrice = 0;

    if (cart) {
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Sebetden sil';
            removeButton.onclick = () => removeFromCart(index);
            li.innerHTML = ` <img src="${item.image}" alt="${item.title}"><br>-
            ${item.title}<br> - ${item.price}<br>`;
            
            
            li.appendChild(removeButton);
            cartList.appendChild(li);

            itemCount++;
            cartPrice += item.price;
        });
    }

    totalItemCount.textContent = 'toplam eded' + ' ' + itemCount;
    totalPrice.textContent = 'toplam qiymet' + ' ' + cartPrice;
}

window.onload = () => {
    renderProducts();
    displayCart();
}; 