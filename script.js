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

            <div class="productActions">
                <button onclick="editProduct(${product.id})">Edit</button>
                <button onclick="deleteProduct(${product.id})">Delete</button>
                <button onclick="toggleProductModel(false)">Close</button>
            </div>
        </div>
    `;

    toggleProductModel(true);
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
        const tabs = document.querySelectorAll("nav li");

        tabs.forEach(item => item.classList.remove("active"));
        clickedTab.classList.add("active");
    }

    let filteredData;

    if (tab === "all") {
        filteredData = data;
    } else if (tab === "in") {
        filteredData = data.filter(item => item.quantity > 0);
    } else if (tab === "out") {
        filteredData = data.filter(item => item.quantity === 0);
    }

    list.innerHTML = filteredData.map(item => card(item)).join("");
}

handletab("all");