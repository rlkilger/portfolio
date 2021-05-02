//assignments list
const links = [
  {
    label: "Week 1 Notes - Local Storage",
    url: "week1/index.html"
  },
  {
    label: "Week 2 Notes",
    url: "week2/index.html"
  },
  {
    label: "Week 2 Team Activity",
    url: "week2/team-activity2/index.html"
  }
]

const list = document.querySelector(".main-list");

links.forEach(link => {
  let li = document.createElement("li");

  let a = document.createElement("a");
  a.setAttribute("href", link.url);
  a.setAttribute("target", `_blank`);
  a.innerHTML = link.label;

  list.append(li);
  li.append(a);
})


//current year
document.getElementById("year").innerHTML = new Date().getFullYear();