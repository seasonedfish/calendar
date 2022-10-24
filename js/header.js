const header = document.createElement("header");

const h1 = document.createElement("h1");
h1.innerHTML = "November 2017";

header.appendChild(h1);

document.body.prepend(header);