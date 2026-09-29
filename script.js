let data = [
    {
        id: 1,
        title: "Shoes - Jordan",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam et aut suscipit optio voluptatem vel.",
        img: "./../images/jordan.jfif",
        price: 35000,
        quantity: 12,
    },
    {
        id: 2,
        title: "Sweater - Nike",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam et aut suscipit optio voluptatem vel.",
        img: "./../images/swweater.jfif",
        price: 25000,
        quantity: 5,
    },
    {
        id: 3,
        title: "Sports wear - Basketball",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam et aut suscipit optio voluptatem vel.",
        img: "./../images/basketball.jfif",
        price: 18000,
        quantity: 0,
    },
    {
        id: 4,
        title: "Skateboard - medium",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam et aut suscipit optio voluptatem vel.",
        img: "./../images/skateboard.jfif",
        price: 25000,
        quantity: 2,
    },
];

const productModel = document.querySelector(".productModel");
const contents = document.querySelector(".productModel .contents");
const list = document.querySelector(".list");

function toggleProductModel(open) {
    productModel.classList.toggle("active", open);
}

function showProduct(id) {
    const product = data.find(item => item.id === id);

    contents.innerHTML = `
        <div class="productImage">
            <img src="${product.img}" alt="${product.title}">
        </div>

        <div class="productInfo">
            <h2>${product.title}</h2>

            <p>${product.description}</p>

            <div class="productDetails">
                <div>
                    <strong>Price</strong>
                    <span>${product.price.toLocaleString()} RWF</span>
                </div>

                <div>
                    <strong>Quantity</strong>
                    <span>${product.quantity}</span>
                </div>

                <div>
                    <strong>Status</strong>
                    <span>${product.quantity > 0 ? "In Stock" : "Out of Stock"}</span>
                </div>
            </div>

            <div class="stockAction">
                <input
                    type="number"
                    id="quantityInput"
                    min="1"
                    placeholder="Quantity"
                >

                <div class="productActions">
                    <button onclick="sellProduct(${product.id})">
                        Sell
                    </button>

                    <button onclick="addStock(${product.id})">
                        Add Stock
                    </button>

                    <button onclick="toggleProductModel(false)">
                        Close
                    </button>
                </div>
            </div>
        </div>
    `;

    toggleProductModel(true);
}

function sellProduct(id) {
    const product = data.find(item => item.id === id);
    const input = document.querySelector("#quantityInput");
    const quantity = Number(input.value);

    if (!quantity || quantity < 1) {
        alert("Enter a valid quantity.");
        return;
    }

    if (quantity > product.quantity) {
        alert(`Only ${product.quantity} items are available.`);
        return;
    }

    const total = quantity * product.price;

    if (!confirm(
        `Sell ${quantity} ${product.title}?\n\nTotal: ${total.toLocaleString()} RWF`
    )) {
        return;
    }

    product.quantity -= quantity;

    showProduct(id);
    handletab("all");
}

function addStock(id) {
    const product = data.find(item => item.id === id);
    const input = document.querySelector("#quantityInput");
    const quantity = Number(input.value);

    if (!quantity || quantity < 1) {
        alert("Enter a valid quantity.");
        return;
    }

    const total = quantity * product.price;

    if (!confirm(
        `Add ${quantity} ${product.title} to stock?\n\nTotal value: ${total.toLocaleString()} RWF`
    )) {
        return;
    }

    product.quantity += quantity;

    showProduct(id);
    handletab("all");
}

function card(product) {
    return `
        <div class="item ${product.quantity > 0 ? "green" : "red"}"
             onclick="showProduct(${product.id})">

            <img src="${product.img}" alt="${product.title}">

            <div class="info">
                <h2>${product.title}</h2>

                <p>${product.description}</p>

                <div class="details">
                    <span>
                        <strong>Price</strong>
                        ${product.price.toLocaleString()} RWF
                    </span>

                    <span>
                        <strong>Quantity</strong>
                        ${product.quantity}
                    </span>
                </div>
            </div>
        </div>
    `;
}

function handletab(tab, clickedTab) {
    if (clickedTab) {
        document
            .querySelectorAll("nav li")
            .forEach(item => item.classList.remove("active"));

        clickedTab.classList.add("active");
    }

    let filteredData = data;

    if (tab === "in") {
        filteredData = data.filter(item => item.quantity > 0);
    }

    if (tab === "out") {
        filteredData = data.filter(item => item.quantity === 0);
    }

    list.innerHTML = filteredData.map(card).join("");
}

handletab("all");

let stockOperation = "sell";
let selectedProducts = [];

const stockModel = document.querySelector(".stockModel");
const stockProducts = document.querySelector("#stockProducts");
const stockTitle = document.querySelector("#stockTitle");
const stockTotal = document.querySelector("#stockTotal");
const stockConfirm = document.querySelector("#stockConfirm");

function openStockModal(operation) {
    console.log("clicked")
    stockOperation = operation;
    selectedProducts = [];

    stockTitle.textContent =
        operation === "sell" ? "Sell Products" : "Add Stock";

    stockConfirm.textContent =
        operation === "sell" ? "Sell" : "Add Stock";

    renderStockProducts();

    stockModel.classList.add("active");
}

function closeStockModal() {
    stockModel.classList.remove("active");
}

function renderStockProducts() {
    const products = stockOperation === "sell"
        ? data.filter(product => product.quantity > 0)
        : data;

    stockProducts.innerHTML = products.map(product => `
        <div class="stockProduct">

            <div class="stockProductInfo">
                <img src="${product.img}" alt="${product.title}">

                <div>
                    <h3>${product.title}</h3>
                    <p>${product.price.toLocaleString()} RWF</p>
                    <small>Available: ${product.quantity}</small>
                </div>
            </div>

            <div class="stockQuantity">
                <input
                    type="number"
                    min="0"
                    ${stockOperation === "sell"
                        ? `max="${product.quantity}"`
                        : ""}
                    value="0"
                    data-id="${product.id}"
                    oninput="updateStockQuantity(${product.id}, this.value)"
                >

                <span id="stock-subtotal-${product.id}">
                    0 RWF
                </span>
            </div>

        </div>
    `).join("");

    updateStockTotal();
}

function updateStockQuantity(id, value) {
    const product = data.find(item => item.id === id);

    let quantity = Number(value);

    if (!Number.isFinite(quantity) || quantity < 0) {
        quantity = 0;
    }

    if (stockOperation === "sell" && quantity > product.quantity) {
        quantity = product.quantity;

        const input = document.querySelector(
            `.stockQuantity input[data-id="${id}"]`
        );

        input.value = quantity;
    }

    const existing = selectedProducts.find(item => item.id === id);

    if (existing) {
        existing.quantity = quantity;
    } else {
        selectedProducts.push({
            id,
            quantity
        });
    }

    document.querySelector(
        `#stock-subtotal-${id}`
    ).textContent = `${(quantity * product.price).toLocaleString()} RWF`;

    updateStockTotal();
}

function updateStockTotal() {
    const total = selectedProducts.reduce((sum, selected) => {
        const product = data.find(item => item.id === selected.id);

        return sum + selected.quantity * product.price;
    }, 0);

    stockTotal.textContent = `${total.toLocaleString()} RWF`;
}

function confirmStockOperation() {
    const selected = selectedProducts.filter(
        item => item.quantity > 0
    );

    if (!selected.length) {
        alert(
            stockOperation === "sell"
                ? "Select at least one product to sell."
                : "Select at least one product to add."
        );

        return;
    }

    for (const item of selected) {
        const product = data.find(product => product.id === item.id);

        if (
            stockOperation === "sell" &&
            item.quantity > product.quantity
        ) {
            alert(
                `${product.title} only has ${product.quantity} available.`
            );

            return;
        }
    }

    const total = selected.reduce((sum, item) => {
        const product = data.find(product => product.id === item.id);

        return sum + item.quantity * product.price;
    }, 0);

    const message = stockOperation === "sell"
        ? `Complete this sale?\n\nTotal: ${total.toLocaleString()} RWF`
        : `Add these items to stock?\n\nTotal value: ${total.toLocaleString()} RWF`;

    if (!confirm(message)) {
        return;
    }

    selected.forEach(item => {
        const product = data.find(product => product.id === item.id);

        product.quantity += stockOperation === "sell"
            ? -item.quantity
            : item.quantity;
    });

    closeStockModal();
    handletab("all");
}

const newProductModel = document.querySelector(".newProductModel");

function openNewProductModal() {
    newProductModel.classList.add("active");
}

function closeNewProductModal() {
    newProductModel.classList.remove("active");
}

function createProduct(event) {
    event.preventDefault();

    const title = document.querySelector("#newTitle").value.trim();
    const description = document.querySelector("#newDescription").value.trim();
    const price = Number(document.querySelector("#newPrice").value);
    const quantity = Number(document.querySelector("#newQuantity").value);
    const img = document.querySelector("#newImage").value.trim();

    if (!title || !description || !img || price < 0 || quantity < 0) {
        alert("Please enter valid product information.");
        return;
    }

    data.push({
        id: Date.now(),
        title,
        description,
        img,
        price,
        quantity
    });

    event.target.reset();

    closeNewProductModal();
    handletab("all");
}