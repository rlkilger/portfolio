//assignments list
// const links = [
//   {
//     label: "Week 1 Notes - Local Storage",
//     url: "week1/index.html"
//   },
//   {
//     label: "Week 2 Notes - Programming Basics / Arrays, Logic, and Loops / Functions",
//     url: "week2/index.html"
//   },
//   {
//     label: "Week 2 Team Activity",
//     url: "week2/team-activity2/index.html"
//   },
//   {
//     label: "Week 3 Notes - Object Methods: this / Objects / Document Object Model / Events",
//     url: "week3/index.html"
//   },
//   {
//     label: "Week 3 Team Activity 1",
//     url: "week3/team-activity3/start1.html"
//   },
//   {
//     label: "Week 3 Team Activity 2",
//     url: "week3/team-activity3/start2.html"
//   },
//   {
//     label: "Week 4 Notes - Forms / Object Oriented Programming / Modern Javascript",
//     url: "week4/index.html"
//   },
//   {
//     label: "Week 4 Team Activity",
//     url: "week4/team-activity4/tictactoe.html"
//   },
//   {
//     label: "Week 5 Notes - Testing and Debugging",
//     url: "week5/index.html"
//   },
//   {
//     label: "Week 5 Team Activity",
//     url: "week5/team-activity5/index.html"
//   }
// ]

// const list = document.querySelector(".main-list");

// links.forEach(link => {
//   let li = document.createElement("li");

//   let a = document.createElement("a");
//   a.setAttribute("href", link.url);
//   a.setAttribute("target", `_blank`);
//   a.innerHTML = link.label;

//   list.append(li);
//   li.append(a);
// })


//current year
document.getElementById("year").innerHTML = new Date().getFullYear();