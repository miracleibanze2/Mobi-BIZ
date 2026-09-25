let data = [
    {
        title: "Shoes - Jordan",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam et aut suscipit optio voluptatem vel.",
    },
    {
        title: "Sweater - Nike",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam et aut suscipit optio voluptatem vel.",
    },
    {
        title: "Sports wear - Basketball",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam et aut suscipit optio voluptatem vel.",
    },
    {
        title: "Skateboard - medium",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam et aut suscipit optio voluptatem vel.",
    },
];

const list = document.querySelector(".list");

list.innerHTML = data.map((item) => `
    <div class="item">
        <h2>${item.title}</h2>
        <p>${item.description}</p>
    </div>
`).join("");