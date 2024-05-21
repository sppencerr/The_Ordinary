function initializeProductsAndCart() {
    const products = [
        {
            id: 1,
            name: "Glycolic Acid 7% Exfoliating Toner",
            basePrice: 8.70,
            sizes: ["100ml", "240ml"],
            increments: 5
        },
        {
            id: 2,
            name: "Caffeine Solution 5% + EGCG",
            basePrice: 9.20,
            sizes: ["30ml"],
            increments: 5
        },
        {
            id: 3,
            name: "Hyaluronic Acid 2% + B5",
            basePrice: 9.90,
            sizes: ["30ml", "60ml", "120ml"],
            increments: 5
        }
    ];

    function initializeProducts() {
        products.forEach(product => {
            const productElement = document.querySelector(`#product-${product.id}`);
            const sizeSelect = productElement.querySelector(".product-sizes");
            const priceElement = productElement.querySelector(".product-price");
            let currentPrice = product.basePrice;

            sizeSelect.addEventListener("change", (event) => {
                const selectedIndex = event.target.selectedIndex;
                currentPrice = product.basePrice + selectedIndex * product.increments;
                priceElement.textContent = `${currentPrice.toFixed(2)} USD`;
            });

            const addToCartButton = productElement.querySelector(".add-to-cart");
            addToCartButton.addEventListener("click", () => {
                addToCart(product.id, product.name, sizeSelect.value, currentPrice);
            });
        });
    }

    function addToCart(productId, productName, productSize, productPrice) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({ productId, productName, productSize, productPrice });
        localStorage.setItem("cart", JSON.stringify(cart));
        // Redirect to cart.html after adding to cart
        window.location.href = "pages/cart.html";
    }

    function updateCartDisplay() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartElement = document.querySelector("#cart-items");
        cartElement.innerHTML = "";

        if (cart.length === 0) {
            cartElement.innerHTML = "<p>Your cart is empty.</p>";
            return;
        }

        const ul = document.createElement("ul");
        cart.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.productName} (${item.productSize}) - ${item.productPrice.toFixed(2)} USD`;
            ul.appendChild(li);
        });
        cartElement.appendChild(ul);
    }

    function loadCart() {
        if (window.location.pathname.endsWith("cart.html")) {
            updateCartDisplay();

            document.getElementById("checkout-button").addEventListener("click", () => {
                alert("Proceeding to checkout...");
                // Add your checkout functionality here
            });

            document.getElementById("clear-cart-button").addEventListener("click", () => {
                localStorage.removeItem("cart");
                updateCartDisplay();
            });
        }
    }

    initializeProducts();
    loadCart();
}

document.addEventListener("DOMContentLoaded", initializeProductsAndCart);
