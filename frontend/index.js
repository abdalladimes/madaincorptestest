async function getUsersList() {
    const response = await fetch(
        'http://filltext.com/?rows=10&fname={firstName}&lname={lastName}&category=["category 1", "category 2", "category 3"]&pretty=true'
    );
    const data = await response.json();

    console.log(data);
    return data;
}

function createCategories(usersList) {
    const container = document.getElementById("categories-container");
    const categories = [
        ...new Set(
            usersList.map(function (item) {
                return item.category;
            })
        ),
    ];
    categories.push("All");
    categories.forEach(function (category) {
        const element = document.createElement("div");
        element.classList.add("category");
        element.textContent = category;
        element.setAttribute("id", category.toLowerCase());
        container.appendChild(element);
        element.addEventListener("click", function () {
            filterByCategory(usersList, category);
        });
    });
}

function filterUsers(usersList, category) {
    if (category == "All") return usersList;
    let filteredUsers = usersList.filter(function (user) {
        return user.category === category;
    });
    return filteredUsers;
}

function createCards(usersList, category) {
    const filteredUsers = filterUsers(usersList, category);

    const container = document.getElementById("cards-container");
    container.innerHTML = "";
    filteredUsers.forEach(function (user) {
        const card = document.createElement("div");
        card.classList.add("card");

        const avatar = document.createElement("div");
        avatar.classList.add("avatar");
        avatar.textContent =
            user.fname.substring(0, 1).toUpperCase() +
            user.lname.substring(0, 1).toUpperCase();

        const fullName = document.createElement("div");
        fullName.classList.add("full-name");
        fullName.textContent = user.fname + " " + user.lname;

        const category = document.createElement("div");
        category.classList.add("category");
        category.textContent = user.category;

        card.appendChild(avatar);
        card.appendChild(fullName);
        card.appendChild(category);

        container.appendChild(card);
    });
}

function filterByCategory(usersList, category) {
    console.log("hi there");
    createCards(usersList, category);
    setActive(category.toLowerCase());
}

function setActive(activeId) {
    const parent = document.getElementById("categories-container");
    const children = parent.querySelectorAll(".category");
    children.forEach(function (child) {
        child.classList.remove("active");
    });
    const activeChild = document.getElementById(activeId);
    activeChild.classList.add("active");
}

async function main() {
    let usersList = await getUsersList();
    createCategories(usersList);
    createCards(usersList, "category 1");
    setActive("category 1");
}

main();
