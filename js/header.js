import {viewDate} from "./main.js";

const header = document.createElement("header");

const h1 = document.createElement("h1");
const monthString = viewDate.toLocaleString("default", {month: "long"});
const year = viewDate.getFullYear()
h1.innerHTML = `${monthString} ${year}`;

header.appendChild(h1);

document.body.prepend(header);
