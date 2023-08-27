const btnAdd = document.querySelector(".btn-add");
const btnText = document.querySelector(".btn-text");
const allContent = document.querySelector(".all-content");

// Load existing to-do items from local storage if available
const todos = JSON.parse(localStorage.getItem("todos")) || [];

function updateLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function btnaddClick() {
  if (btnText.value === "") {
    alert("Todo must contain text");
  } else {
    const node = document.createElement("div");
    node.classList.add("todo-line");

    const node_content = document.createElement("div");
    node_content.classList.add("node_content");
    node_content.innerHTML = btnText.value;
    node.appendChild(node_content);

    allContent.appendChild(node);

    const icons = document.createElement("div");
    icons.classList.add("icons");
    node.appendChild(icons);

    var leftTag = document.createElement("div");
    leftTag.classList.add("left");
    leftTag.innerHTML =
      "<img class='deleteIcon' src='https://amrabdo74.github.io/images/download.png'/>";
    icons.appendChild(leftTag);

    leftTag.onclick = function () {
      node.style.display = "none";
      const index = todos.findIndex((todo) => todo.content === btnText.value);
      if (index !== -1) {
        todos.splice(index, 1);
        updateLocalStorage();
      }
    };

    const todoItem = {
      content: btnText.value,
      completed: false,
    };

    todos.push(todoItem);
    updateLocalStorage();

    node_content.onclick = function () {
      node.classList.toggle("line-throght");
      todoItem.completed = !todoItem.completed;
      updateLocalStorage();
    };
  }
}

btnAdd.addEventListener("click", btnaddClick);

// Load existing to-do items from local storage on page load
todos.forEach((todoItem) => {
  const node = document.createElement("div");
  node.classList.add("todo-line");

  const node_content = document.createElement("div");
  node_content.classList.add("node_content");
  node_content.innerHTML = todoItem.content;
  if (todoItem.completed) {
    node.classList.add("line-throght");
  }
  node.appendChild(node_content);

  allContent.appendChild(node);

  const icons = document.createElement("div");
  icons.classList.add("icons");
  node.appendChild(icons);

  var leftTag = document.createElement("div");
  leftTag.classList.add("left");
  leftTag.innerHTML = "<img class='deleteIcon' src='https://amrabdo74.github.io/images/download.png'/>";
  icons.appendChild(leftTag);

  leftTag.onclick = function () {
    node.style.display = "none";
    const index = todos.findIndex((todo) => todo.content === todoItem.content);
    if (index !== -1) {
      todos.splice(index, 1);
      updateLocalStorage();
    }
  };

  node_content.onclick = function () {
    node.classList.toggle("line-throght");
    todoItem.completed = !todoItem.completed;
    updateLocalStorage();
  };
});




/// for dark and light mode localStorage
document.body.classList.add(localStorage.getItem("page") || "dark")
var el = document.querySelectorAll(".color_switch li");
el[1].classList.add("thenightbuton");

if (document.body.className === "light") {
  el[1].style.display = "none";

}
if (document.body.className === "dark") {
  el[0].style.display = "none"
}
el[0].addEventListener("click",
  function () {
    el[0].style.display = "none"
    el[1].style.display = "block"
    document.body.classList.remove("light");
    document.body.classList.add(this.getAttribute("dete_color"));
    localStorage.setItem("page", this.getAttribute("dete_color"))

  }, false
)

el[1].addEventListener("click",
  function () {
    el[1].style.display = "none"
    el[0].style.display = "block"
    document.body.classList.remove("dark");
    document.body.classList.add(this.getAttribute("dete_color"));
    el[1].classList.add("thenightbuton");
    localStorage.setItem("page", this.getAttribute("dete_color"))


  }, false
)
