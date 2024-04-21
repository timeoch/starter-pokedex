function createUser(nom, selectedAvatar) {
    const user = {
        nom: nom,
        avatar: selectedAvatar,
        pokedex: []
    };
    Users(user);
    window.localStorage.setItem('user', JSON.stringify(user));
    updateUsers(user); // Mettre à jour le tableau des utilisateurs avec le nouvel utilisateur
}

function Users(user) {
    let users = getUsers();
    if (!users) {
        users = [];
    }
    users.push(user);
    window.localStorage.setItem('users', JSON.stringify(users));
}

function getUser() {
    return JSON.parse(window.localStorage.getItem('user'));
}

function getUsers() {
    const users = JSON.parse(window.localStorage.getItem('users'));
    return Array.isArray(users) ? users : [];
}

function updateUsers(updatedUser) {
    let users = getUsers();
    const index = users.findIndex(u => u.nom === updatedUser.nom);

    if (index !== -1) {
        users[index] = updatedUser;
        window.localStorage.setItem('users', JSON.stringify(users));
    }
}

function deleteUser(user) {
    let users = getUsers();
    const index = users.findIndex(u => u.nom === user.nom);

    if (index !== -1) {
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
    }
}

export { createUser, getUser, getUsers, deleteUser, updateUsers };
