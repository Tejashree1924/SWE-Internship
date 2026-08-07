// ==================================
// Default Users (used only if nothing is saved yet)
// ==================================

let defaultUsers = [

    {
        name: "Kabila",
        email: "kabila@zybisys.com",
        status: "Active"
    },

    {
        name: "Kolavizhi",
        email: "kolavizhi@zybisys.com",
        status: "Invited"
    },

    {
        name: "Thamanna",
        email: "thamanna@zybisys.com",
        status: "Active"
    },

    {
        name: "Atif",
        email: "atif@zybisys.com",
        status: "Active"
    }

];


// ==================================
// Load users from localStorage (if any), else use defaults
// ==================================

let savedUsers = localStorage.getItem("users");

let users = savedUsers ? JSON.parse(savedUsers) : defaultUsers;


// ==================================
// Helper: Save current users array to localStorage
// ==================================

function saveUsers(){

    localStorage.setItem("users", JSON.stringify(users));

}


// ==================================
// Promise
// ==================================

function getUsers(){

    return new Promise(function(resolve){

        setTimeout(function(){

            resolve(users);

        },1000);

    });

}


// ==================================
// Display Users
// ==================================

function displayUsers(userList){

    let tableBody = document.getElementById("tableBody");

    tableBody.innerHTML = "";

    userList.forEach(function(user,index){

        let statusClass =
        user.status === "Active"
        ? "status-active"
        : "status-invited";

        tableBody.innerHTML += `

        <tr>

            <td>${user.name}</td>

            <td>${user.email}</td>

            <td>

                <span class="${statusClass}">
                    ${user.status}
                </span>

            </td>

            <td>

                <div class="menu">

                    <button
                    class="menu-btn"
                    onclick="toggleMenu(${index})">

                    ⋮

                    </button>

                    <div
                    class="dropdown"
                    id="menu${index}">

                        <button onclick="editUser(${index})">

                            Edit

                        </button>

                        <button onclick="deleteUser(${index})">

                            Delete

                        </button>

                    </div>

                </div>

            </td>

        </tr>

        `;

    });

}



// ==================================
// Async Await
// ==================================

async function loadUsers(){

    let data = await getUsers();

    displayUsers(data);

}

loadUsers();



// ==================================
// Search
// ==================================

document
.getElementById("search")
.addEventListener("keyup",function(){

    let searchText = this.value.toLowerCase();

    let filteredUsers = users.filter(function(user){

        return user.name
        .toLowerCase()
        .includes(searchText);

    });

    displayUsers(filteredUsers);

});



// ==================================
// Add User
// ==================================

document
.getElementById("addBtn")
.addEventListener("click",function(){

    let name = prompt("Enter User Name");

    if(name == null || name == "")
        return;

    let email = prompt("Enter Email");

    if(email == null || email == "")
        return;

    let status = prompt("Enter Status (Active/Invited)");

    if(status == null || status == "")
        status = "Active";

    users.push({

        name:name,
        email:email,
        status:status

    });

    saveUsers();

    displayUsers(users);

});



// ==================================
// Toggle Menu
// ==================================

function toggleMenu(index){

    let menu =
    document.getElementById("menu"+index);

    menu.classList.toggle("show");

}



// ==================================
// Edit User
// ==================================

function editUser(index){

    let newName = prompt(

        "Edit Name",

        users[index].name

    );

    if(newName != null && newName != ""){

        users[index].name = newName;

    }

    let newEmail = prompt(

        "Edit Email",

        users[index].email

    );

    if(newEmail != null && newEmail != ""){

        users[index].email = newEmail;

    }

    saveUsers();

    displayUsers(users);

}



// ==================================
// Delete User
// ==================================

function deleteUser(index){

    let result =
    confirm("Delete this user?");

    if(result){

        users.splice(index,1);

        saveUsers();

        displayUsers(users);

    }

}