document.addEventListener("DOMContentLoaded", function () {
    const productData = [
        {
            name: "Pasta de Dientes 200 g",
            description: "",
            price: 155.68,
            categories: ["Cuidado Oral", "todos"],
            image: "https://www.amway.com.hn/img_pict/520_Catalog/Products/full/520_124106.jpg?20231002131041"
        },
        {
            name: "Enjuague Bucal Multiacción",
            description: "",
            price: 140.00,
            categories: ["Ropa", "todos"],
            image: "https://www.amway.com.hn/img_pict/520_Catalog/Products/medium/520_124108.jpg?20231002161054"
        },
       {
            name: "Refrescante bucal Glister",
            description: "",
            price: 136.28,
            categories: ["Ropa", "todos"],
            image: "https://www.amway.com.hn/img_pict/520_Catalog/Products/full/520_124111.jpg?20231002171030"
        },
       {
            name: "Hilo Dental Multiacción",
            description: "",
            price: 264.38,
            categories: ["Ropa", "todos"],
            image: "https://www.amway.com.hn/img_pict/520_Catalog/Products/full/520_124112.jpg?20231002171031"
        },
      {
            name: "NUTRILITE DROPS",
            description: "",
            price: 199.55,
            categories: ["Ropa", "todos"],
            image: "https://www.amway.com.hn/img_pict/520_Catalog/Products/full/520_277411.jpg?20231002181011"
        },
        // Otros productos con categorías...
    ];

    const productList = document.querySelector(".product-list");
    const cartItems = document.getElementById("cart-items");
    const sendCartButton = document.getElementById("send-cart");
    const toggleCartButton = document.getElementById("toggle-cart");
    const cart = document.querySelector(".cart");
    const totalElement = document.getElementById("cart-total");
    const cartSubtotalElement = document.getElementById("cart-subtotal");
    const deliveryFeeElement = document.getElementById("delivery-fee");
    const cartCountElement = document.getElementById("cart-count");
    const whatsappNumber = "50494895988";
    
    let cartTotal = 0;
    const productSubtotals = new Map();
    let orderNumber = 0;
    let cartItemCount = 0;
    let currentCategory = "all";
    
    function displayProducts(products) {
        productList.innerHTML = "";
        products.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");
            productElement.innerHTML = `
                <h3>${product.name}</h3>
                <img src="${product.image}" alt="${product.name}">
                <p>${product.description}</p>
                <p>Precio: L${product.price.toFixed(2)}</p>
                <p>Categorías: ${product.categories.join(", ")}</p>
                <button class="add-to-cart">Agregar al Carrito</button>
            `;
            productList.appendChild(productElement);
    
            const addToCartButton = productElement.querySelector(".add-to-cart");
            addToCartButton.addEventListener("click", () => addToCart(product));
        });
    }
    
    function showNotification(message) {
        const notificationContainer = document.getElementById('notification-container');
        notificationContainer.textContent = message;
        notificationContainer.style.display = 'block';
    
        setTimeout(() => {
            notificationContainer.style.display = 'none';
        }, 3000);
    }
    
    function addToCart(product) {
        const cartItem = document.createElement("li");
        cartItem.classList.add("cart-item");
    
        const uniqueClass = `product-${Date.now()}`;
        cartItem.classList.add(uniqueClass);
    
        cartItem.innerHTML = `
            ${product.name} - L${product.price.toFixed(2)}
            <button class="remove-from-cart" data-unique-class="${uniqueClass}">Eliminar</button>
            <select class="quantity-select">Cant
                <option value="1">Cantidad 1</option>
                <option value="2">Cantidad 2</option>
                <option value="3">Cantidad 3</option>
                <option value="4">Cantidad 4</option>
                <option value="5">Cantidad 5</option>
                <option value="6">Cantidad 6</option>
                <option value="7">Cantidad 7</option>
                <option value="8">Cantidad 8</option>
                <option value="9">Cantidad 9</option>
                <option value="10">Cantidad 10</option>
            </select>
            <span class="subtotal">Total por productos:  L${product.price.toFixed(2)}</span>
        `;
        cartItems.appendChild(cartItem);
    
        const removeFromCartButtons = document.querySelectorAll(".remove-from-cart");
        removeFromCartButtons.forEach(button => {
            button.addEventListener("click", () => {
                const uniqueClass = button.getAttribute("data-unique-class");
                removeFromCart(uniqueClass);
            });
        });
    
        const quantitySelect = cartItem.querySelector(".quantity-select");
    
        quantitySelect.addEventListener("change", () => updateCartItemTotal(cartItem, product.price, quantitySelect));
    
        cartTotal += product.price;
        totalElement.textContent = `Total: L${cartTotal.toFixed(2)}`;
    
        productSubtotals.set(uniqueClass, product.price);
    
        updateCartSubtotal();
    
        showNotification(`"${product.name}" ha sido agregado al carrito.`);
    
        cartItemCount++;
        cartCountElement.textContent = cartItemCount;
    }
    
    function removeFromCart(uniqueClass) {
        const cartItemToRemove = document.querySelector(`.cart-item.${uniqueClass}`);
        if (cartItemToRemove) {
            const removedPrice = productSubtotals.get(uniqueClass);
    
            cartTotal -= removedPrice;
            totalElement.textContent = `Total: L${cartTotal.toFixed(2)}`;
    
            productSubtotals.delete(uniqueClass);
    
            cartItemToRemove.remove();
    
            if (cartItems.children.length === 0) {
                cartTotal = 0;
                totalElement.textContent = `Total: L${cartTotal.toFixed(2)}`;
                cartSubtotalElement.textContent = `Subtotal: L${cartTotal.toFixed(2)}`;
            } else {
                updateCartSubtotal();
            }
    
            cartItemCount--;
            cartCountElement.textContent = cartItemCount;
        }
    }
    
    function updateCartSubtotal() {
        let cartSubtotal = 0;
        productSubtotals.forEach(subtotal => {
            cartSubtotal += subtotal;
        });
    
        cartSubtotalElement.textContent = `Subtotal: L${cartSubtotal.toFixed(2)}`;
    
        const deliveryFee = parseFloat(deliveryFeeElement.textContent.replace("Tarifa de entrega: L", ""));
        cartTotal = cartSubtotal + deliveryFee;
        totalElement.textContent = `Total: L ${cartTotal.toFixed(2)}`;
    }
    
    function updateCartItemTotal(cartItem, productPrice, quantitySelect) {
        const quantity = parseInt(quantitySelect.value, 10);
        const subtotal = quantity * productPrice;
    
        cartItem.querySelector(".subtotal").textContent = `L ${subtotal.toFixed(2)}`;
    
        const uniqueClass = cartItem.classList[1];
        productSubtotals.set(uniqueClass, subtotal);
    
        updateCartSubtotal();
    }
    
    function toggleCart() {
        if (cart.style.display === "block") {
            cart.style.display = "none";
        } else {
            cart.style.display = "block";
        }
    }
    
    function sendCartToWhatsApp() {
        orderNumber++;
    
        const deliveryAddress = document.getElementById("delivery-address").value;
        const userName = document.getElementById("user-name").value;
        const userPhone = document.getElementById("user-phone").value;
        const deliveryMethod = document.getElementById("delivery-method").value;
        const paymentMethod = document.getElementById("payment-method").value;
    
        if (!deliveryAddress || !userName || !userPhone) {
            alert("Por favor, complete la dirección, el nombre y el número de teléfono antes de enviar el pedido.");
            return;
        }
    
        const items = Array.from(cartItems.children).map(item => {
            const productName = item.textContent.split("-")[0].trim();
            const quantity = parseInt(item.querySelector(".quantity-select").value, 10);
            return `${quantity}x ${productName}`;
        }).join("\n");
    
        const subtotal = cartTotal.toFixed(2);
        const deliveryFee = parseFloat(deliveryFeeElement.textContent.replace("Tarifa de entrega: L", ""));
        const total = (cartTotal + deliveryFee).toFixed(2);
    
        const currentTime = new Date();
        const formattedTime = `${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}`;
    
        const orderMessage = `-----------------------------------
✏ Verifique el pedido a continuación:
Pedido ${orderNumber} - Wookcom Shop
--------------------------------------
    
*${items}*
----------------------------------
    
Subtotal: L${subtotal}
Tarifa de entrega: L${deliveryFee}
Total: *L${total}*
    
----------------------------------
    
⏰ Tiempo promedio de entrega: 30 Para 60 Minutos
    
🤩 ${userName}
📱 ${userPhone}
    
🏠 ${deliveryAddress} - Choluteca / Choluteca 
    
💳 Método de pago: ${paymentMethod}
🛵 Método de entrega: ${deliveryMethod}
    
Pedido generado por Wookcom Ordering (Delivery) En ${formattedTime}`;
    
        const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(orderMessage)}`;
        window.location.href = whatsappLink;
    }
    
    const categoryFilterSelect = document.getElementById("category-filter");
    
    function filterProductsByCategory() {
        const selectedCategory = categoryFilterSelect.value;
    
        if (selectedCategory === "all") {
            displayProducts(productData);
        } else {
            const filteredProducts = productData.filter(product => product.categories.includes(selectedCategory));
            displayProducts(filteredProducts);
        }
        currentCategory = selectedCategory;
    }
    
    categoryFilterSelect.addEventListener("change", filterProductsByCategory);
    
    function searchProducts() {
        const searchTerm = productSearchInput.value.toLowerCase();
        let filteredProducts = productData;
        
        if (currentCategory !== "all") {
            filteredProducts = productData.filter(product => product.categories.includes(currentCategory));
        }
        
        filteredProducts = filteredProducts.filter(product => {
            return product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm);
        });
        displayProducts(filteredProducts);
    }
    
    const productSearchInput = document.getElementById("product-search");
    
    productSearchInput.addEventListener("input", searchProducts);

    displayProducts(productData);
    updateCartSubtotal();
    
    sendCartButton.addEventListener("click", sendCartToWhatsApp);
    toggleCartButton.addEventListener("click", toggleCart);
});
