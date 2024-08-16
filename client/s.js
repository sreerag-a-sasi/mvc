// const { response } = require("express");

// let dataContainer = document.getElementById("dataContainer");
// console.log("dataContainer : ", dataContainer);

// let rows = '';

// for (let i = 0; i < body.data.length; i++) {
//     let firstName = body.data[i].firstName ? body.data[i].firstName : "Null";
//     let lastName = body.data[i].lastName ? body.data[i].lastName : "Null";
//     let email = body.data[i].email ? body.data[i].email : "Null";
//     let password = body.data[i].password ? body.data[i].password : "Null";
//     rows =
//         rows +
//         `
//     <tr>
//               <td><input type="text" id='name-${body.data[i]._id}' value=${firstName} disabled="true" placeholder="name"></td>
//               <td><input type="text" id='username-${body.data[i]._id}' value=${lastName} disabled=true placeholder="username"></td>
//               <td><input type="email" id='email-${body.data[i]._id}' value=${email} disabled=true></td>
//               <td><input type="password" id='password-${body.data[i]._id}' value=${password} disabled=true></td>
//               <td><button onclick= "handleEdit('${body.data[i]._id}')">Edit</button></td>
//               <td><button onclick= "handleSave('${body.data[i]._id}')">Save</button></td>
//               <td><button onclick= "remove('${body.data[i]._id}')">remove user</button></td>
//     </tr>
//         `;
// }
// console.log("rows : ", rows);
// dataContainer.innerHTML = rows;






// async function details(event) {
//     // event.preventDefault();
//     console.log("details");

//     let response = await fetch('/details', {
//         method: "POST",
//         headers: {
//             'content-Type': 'application/json'
//         },
//     });
//     responsedata = response.json();
//     console.log("response: ", responsedata);
// }

