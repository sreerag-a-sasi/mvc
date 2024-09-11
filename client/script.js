async function login(event) {
    event.preventDefault();
    console.log("Login ...");

    let datas = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };

    let json_datas = JSON.stringify(datas);

    let response = await fetch('/login', {
        method: "POST",
        headers: {
            'content-Type': 'application/json'
        },
        body: json_datas,
    });
    console.log("response : ", response);

    let parsed_response = await response.json();
    console.log("parsed_response : ", parsed_response);

    alert(parsed_response.message);

    let token = parsed_response.data;
    console.log("token : ", token.data);

    if (parsed_response.success && token) {
        localStorage.setItem('token', token.data);
        window.location.href = "getDetails.html";
        return;
    } else {
        alert(parsed_response.message);
        return;
    }
}


async function handleSubmit(event) {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
        alert("you must be logged in to continue this process..");
        return;
    }
    console.log("new ...");
    let data = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
    };


    console.log("firstname :", firstName.value);
    console.log("lastname :", lastName.value);
    console.log("email :", email.value);

    let json_data = JSON.stringify(data);

    console.log("data : ", json_data);


    let response = await fetch('/users', {
        method: "POST",
        headers: {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: json_data,
    });
    console.log("response : ", response);

    let parsed_response = await response.json();
    console.log("parsed_response : ", parsed_response);

    if (parsed_response.success) {
        alert(parsed_response.message);
        return;
    } else {
        alert(parsed_response.message);
        return;
    }

    //Validate this datas

    //Convert this to an object

    //Convert this object to json

    //Send this json via request to express server (post req)

    //Take response

    //Display response


}

// async function handleSubmit(event) {
//     event.preventDefault();

//     const token = localStorage.getItem('token');
//     if (!token) {
//         alert("You must be logged in to continue this process.");
//         return;
//     }

//     const firstName = document.getElementById('firstName').value;
//     const lastName = document.getElementById('lastName').value;
//     const email = document.getElementById('email').value;
//     const imageFile = document.getElementById('imageUpload').files[0];

//     if (!imageFile) {
//         alert("Please select an image to upload.");
//         return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = async function() {
//         const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');

//         let data = {
//             firstName: firstName,
//             lastName: lastName,
//             email: email,
//             image: base64String
//         };

//         let json_data = JSON.stringify(data);

//         console.log("data: ", json_data);

//         let response = await fetch('/users', {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             body: json_data,
//         });

//         console.log("response: ", response);

//         let parsed_response = await response.json();
//         console.log("parsed_response: ", parsed_response);

//         if (parsed_response.success) {
//             alert(parsed_response.message);
//         } else {
//             alert(parsed_response.message);
//         }
//     };

//     reader.readAsDataURL(imageFile);
// }

// document.getElementById('uploadForm').addEventListener('submit', handleSubmit);



async function handleForgot(event) {
    event.preventDefault();
    // console.log("reseting password ...");
    let data = {
        email: document.getElementById('email').value,
        // password: document.getElementById('password').value,
    };
    console.log("email :", email.value);
    // console.log("password :", password.value);


    let json_data = JSON.stringify(data);

    console.log("data : ", json_data);


    let response = await fetch('/forgot-password', {
        method: "POST",
        headers: {
            'content-Type': 'application/json',
        },
        body: json_data,
    });
    console.log("response : ", response);

    let parsed_response = await response.json();
    console.log("parsed_response : ", parsed_response);

    if (parsed_response.success) {
        alert(parsed_response.message);
        return;
    } else {
        alert(parsed_response.message);
        return;
    }
}

async function getUsersData() {

    const token = localStorage.getItem('token'); // Retrieve the token
    console.log("Access token : ", token);
    //get token from localstorage
    let response = await fetch('/users', {
        method: "GET",
        headers: {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    if (response.ok) {
        const data = await response.json();
        console.log('User data:', data.data);

        let res = data.data;
        console.log("res : ", res.data);

        let dataContainer = document.getElementById("dataContainer");

        let rows = '';
        firstName1 = res.data[0].firstName;

        for (let i = 0; i < res.data.length; i++) {
            let firstName = res.data[i].firstName ? res.data[i].firstName : "Null";
            let lastName = res.data[i].lastName ? res.data[i].lastName : "Null";
            let email = res.data[i].email ? res.data[i].email : "Null";
            // let password = res.data[i].password ?res.data[i].password : "Null";
            rows =
                rows +
                `
        <tr>
                  <td><input class="in" type="text" id='name-${res.data[i]._id}' value="${firstName}" disabled="true" placeholder="name"></td>
                  <td><input class="in" type="text" id='username-${res.data[i]._id}' value="${lastName}" disabled=true placeholder="username"></td>
                  <td><input class="in" type="email" id='email-${res.data[i]._id}' value="${email}" disabled=true placeholder="email"></td>
                  <td><button onclick="handleView('${res.data[i]._id}')">View</button></td>
        </tr>
            `;
        }
        console.log("rows : ", rows);
        dataContainer.innerHTML = rows;
    } else {
        console.error('Error fetching user data:', response.status);
    }
    // console.log("response : ", JSON.stringify(response));
    //Make a request to the server route or api with bearer token passed in req headers as authorization token
    //Get response (user datas)
    //Show datas
}


function handleView(id) {
    console.log("id : ", id);

    // Redirect to view page and pass id as search params
    window.location.href = `userPage.html?id=${id}`;
}

// Function to load single user data for view page
async function loadUserData() {
    // // Get the id from search params
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log(id);
    if (id) {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token
            console.log("Access token : ", token);
            // Make an HTTP request to get user data
            let response = await fetch(`users/${id}`, {
                method: "GET",
                headers: {
                    'content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            let data = await response.json();
            console.log("user data : ", data.data);
            // Check if data.data exists and has the expected properties
            if (data) {
                console.log("firstname :", data.data.data.firstName);
                document.getElementById('firstName').value = data.data.data.firstName || 'null';
                document.getElementById('lastName').value = data.data.data.lastName || '';
                document.getElementById('email').value = data.data.data.email || '';
                document.getElementById('profilepic').src = data.data.data.image || 'images/user.png';
            } else {
                console.error('Unexpected data structure:', data);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    } else {
        console.error('No ID found in search params');
    }
}



async function handleReset(event) {
    event.preventDefault();

    console.log("Resetting password ...");

    const currentUrl = window.location.href;
    console.log("url front-end", currentUrl);


    const passwordInput = document.getElementById('password');
    const passwordValue = passwordInput.value;

    const data = {
        currentUrl,
        password: passwordValue,
    };

    const json_data = JSON.stringify(data);

    console.log("Data (front-end):", json_data);

    try {
        const response = await fetch('/reset-password', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: json_data,
        });

        console.log("Response:", response);

        const parsed_response = await response.json();
        console.log("Parsed response:", parsed_response);

        if (parsed_response.success) {
            alert(parsed_response.message);
        } else {
            alert(parsed_response.message);
        }
    } catch (error) {
        console.error("Error during password reset:", error);
        // Handle the error (e.g., display an error message to the user)
    }
}


async function handledit(event) {
    event.preventDefault();
    console.log("editing is working...");

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log(id);

    const token = localStorage.getItem('token');
    console.log("token : ",token);
    
    if (!token) {
        alert("you must be logged in to continue this process..");
        return;
    }
    let data = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
    };


    console.log("firstname :", firstName.value);
    console.log("lastname :", lastName.value);

    let json_data = JSON.stringify(data);

    console.log("data : ", json_data);

    let response = await fetch(`users/${id}`, {
        method: "PUT",
        headers: {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: json_data,
    });
    console.log("response : ", response);

    let parsed_response = await response.json();
    console.log("parsed_response : ", parsed_response);

    if (parsed_response.success) {
        alert(parsed_response.message);
        return;
    } else {
        alert(parsed_response.message);
        return;
    }
}