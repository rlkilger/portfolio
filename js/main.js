const links = [
  {
    label: "Week 1 - notes",
    url: "week1/index.html"
  }
]

const list = document.querySelector(".main-list");

links.forEach(link => {
  let li = document.createElement("li");

  let a = document.createElement("a");
  a.setAttribute("href", `${link.url}`);
  a.setAttribute("target", `_blank`);
  a.innerHTML = `${link.label}`;

  list.append(li);
  li.append(a);
})