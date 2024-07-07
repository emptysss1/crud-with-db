// const users = []

// let currentID = 1

// module.exports = {
//     getUser: () => users,
//     addUser: (user) => {
//         user.id = currentID++;
//         users.push(user);
//     },
//     updateUser: (id, updatedData) => {
//         const userIndex = users.findIndex(u => u.id === id);
//         if (userIndex !== -1){
//             users[userIndex] = { ...users[userIndex], ...updatedData };
//             return users[userIndex];
//         }
//         return null;
//     },
//     deleteUser: (id) => {
//         const userIndex = users.findIndex(u => u.id === id);
//         if (userIndex !== -1){
//             users.splice(userIndex, 1);
//             return true;
//         }
//         return false;
//     },
//     getUserById: (id) => { users.find(u => u.id === id) },
// }