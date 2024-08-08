// old code below for reference:
// addUser() {
//   const newUser = {
//     firstName: 'John',
//     lastName: 'Doe',
//     email: 'john.doe@example.com',
//     password: 'password123',
//     username: 'johndoe',
//     gender: 'male' // including this for completeness
//   };

//   this.userService.addUser(newUser).subscribe({
//     next: (res) => {
//       console.log('User added:', res)
//     },
//     error: (err) => {
//       console.error('Error adding user:', err)
//     },
//     complete: ()=>{
//       console.log("User Added");

//     }
//   });
// }
