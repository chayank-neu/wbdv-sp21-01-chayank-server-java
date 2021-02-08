var $usernameFld
var $passwordFld
var $firstnameFld
var $lastNameFld
var $roleFld
var theTableBody
var $addBtn
var $updateBtn
var userService = new AdminUserServiceClient()

var users = [];

function createUser(user) {
    userService.createUser(user)
        .then(function (actualUsers) {
            users.push(actualUsers)
            renderUsers(users)
        })
}


var selectedUser = null
function selectUser(event) {
    var editBtn = jQuery(event.target)
    var theId = editBtn.attr("id")
    selectedUser = users.find(user => user._id === theId)
    $usernameFld.val(selectedUser.username)
    $passwordFld.val(selectedUser.password)
    $firstnameFld.val(selectedUser.firstName)
    $lastNameFld.val(selectedUser.lastName)
    $roleFld.val(selectedUser.role)
}

function deleteUser(event) {
    console.log(event.target)
    var deleteBtn = jQuery(event.target)
    var theClass = deleteBtn.attr("class")
    var theIndex = deleteBtn.attr("id")
    var theId = users[theIndex]._id
    console.log(theClass)
    console.log(theIndex)

    userService.deleteUser(theId)
        .then(function (status) {
            users.splice(theIndex, 1)
            renderUsers(users)
        })
}

function renderUsers(users) {
    theTableBody.empty()
    for (var i = users.length-1; i >=0; i--) {
        var user = users[i]
        theTableBody
            .prepend(`
    <tr>
        <td>${user.username}</td>
        <td><div class="invisible"> ${user.password}</div></td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.role}</td>
        <td>
            <div class="d-grid gap-2 d-md-block">
                <button class="btn btn-danger wbdv-delete" id="${i}"><i class="fa fa-times" id="${i}" aria-hidden="true"></i></button>&nbsp
                <button class="btn btn-success wbdv-select" id="${user._id}"><i class="fa fa-pencil" id="${user._id}" aria-hidden="true"></i></button>
            </div>
        </td>
    </tr>
  `)
    }
    jQuery(".wbdv-delete")
        .click(deleteUser)
    jQuery(".wbdv-select")
        .click(selectUser)
}

function updateUser() {
    console.log(selectedUser)
    if (selectedUser === null) {

        alert("Please select a user")

    }
    else {

        selectedUser.username = $usernameFld.val()
        selectedUser.password = $passwordFld.val()
        selectedUser.firstName = $firstnameFld.val()
        selectedUser.lastName = $lastNameFld.val()
        selectedUser.role = $roleFld.val()
        userService.updateUser(selectedUser._id, selectedUser)
            .then(function (status) {
                var index = users.findIndex(user => user._id === selectedUser._id)
                users[index] = selectedUser
                renderUsers(users)
            })

    }

}

function init() {
    $usernameFld = $(".wbdv-username-fld")
    $passwordFld = $(".wbdv-password-fld")
    $firstnameFld = $(".wbdv-firstname-fld")
    $lastNameFld = $(".wbdv-lastname-fld")
    $roleFld=$(".wbdv-role-fld")

    theTableBody = jQuery("tbody")

    $addBtn = $(".wbdv-add-btn")

    $addBtn.click(() => {
            createUser({
                username: $usernameFld.val(),
                password: $passwordFld.val(),
                firstName: $firstnameFld.val(),
                lastName: $lastNameFld.val(),
                role: $roleFld.val(),
            })
            $usernameFld.val("")
            $usernameFld.attr("placeholder","Username")
            $passwordFld.val("")
            $passwordFld.attr("placeholder","Password")
            $firstnameFld.val("")
            $firstnameFld.attr("placeholder","First Name")
            $lastNameFld.val("")
            $lastNameFld.attr("placeholder","Last Name")
        }
    )

    $updateBtn=$(".wbdv-update-btn")
    $updateBtn.click(() => {
        updateUser()
        $usernameFld.val("")
        $usernameFld.attr("placeholder","Username")
        $passwordFld.val("")
        $passwordFld.attr("placeholder","Password")
        $firstnameFld.val("")
        $firstnameFld.attr("placeholder","First Name")
        $lastNameFld.val("")
        $lastNameFld.attr("placeholder","Last Name")

    })

    userService.findAllUsers()
        .then(function (actualUsersFromServer) {
            users = actualUsersFromServer
            renderUsers(users)
        })
}

jQuery(init)








