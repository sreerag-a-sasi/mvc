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

    try {
        event.preventDefault();
        console.log("From add user...");

        let firstName = document.getElementById('firstName').value;
        console.log("firstName : ", firstName);

        let lastName = document.getElementById('lastName').value;
        console.log("lastName : ", lastName);

        let email = document.getElementById('email').value;
        console.log("email : ", email);

        let image = document.getElementById('image');
        console.log("image : ", image);

        let img_file = image.files[0];
        console.log("img_file : ", img_file);

        let base64_img = '';

        if (img_file) {
            const reader = new FileReader();
            console.log("reader : ", reader);

            reader.readAsDataURL(img_file);

            reader.onload = function (e) {
                console.log("on onload ...");
                let result = e.target.result;
                console.log("result : ", result);

                base64_img = result;
                submitForm();
            }

            reader.onerror = function (error) {
                console.log("Error reading file : ", error);
            }

        }


        async function submitForm() {

            let datas = {
                firstName,
                lastName,
                email,
                image: base64_img,
            }

            let json_datas = JSON.stringify(datas);
            console.log("json_datas : ", json_datas);

            let token = localStorage.getItem('token');
            console.log("token : ", token);

            let response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: json_datas,
            });

            let parsed_response = await response.json();
            console.log("parsed_response : ", parsed_response);

            if (parsed_response.success) {
                alert(`${parsed_response.message}`);
                return;
            } else {
                let message = parsed_response.message;
                if (message) {
                    alert(message);
                    return;
                } else {
                    alert("Login Failed");
                    return;
                }
            }

        }




    } catch (error) {
        console.log("error : ", error);
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
            <td><button onclick="handleView('${res.data[i]._id}')" id="viewbutton">View</button></td>
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
                document.getElementById('lastName').value = data.data.data.lastName || 'null';
                document.getElementById('email').value = data.data.data.email || 'null';
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
    console.log("token : ", token);

    if (!token) {
        alert("you must be logged in to continue this process..");
        return;
    }

    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let image = document.getElementById('image');
    let img_file = image.files[0];
    let base64_img = '';

    if (img_file) {
        const reader = new FileReader();
        console.log("reader : ", reader);

        reader.readAsDataURL(img_file);

        reader.onload = async function (e) {
            console.log("on onload ...");
            let result = e.target.result;
            console.log("result : ", result);

            base64_img = result;
            await submitEditForm();
        }

        reader.onerror = function (error) {
            console.log("Error reading file : ", error);
        }
    } else {
        await submitEditForm();
    }

    async function submitEditForm() {
        let data = {
            firstName,
            lastName,
            image: base64_img,
        };

        let json_data = JSON.stringify(data);
        console.log("json_data : ", json_data);

        let response = await fetch(`http://localhost:3000/users/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: json_data,
        });

        let parsed_response = await response.json();
        console.log("parsed_response : ", parsed_response);

        if (parsed_response.success) {
            
            alert(parsed_response.message);
            loadUserData();
        } else {
            alert(parsed_response.message);
        }
    }
}



async function handledelete(event) {
    event.preventDefault();
    console.log("deleting is working...");

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log(id);

    const token = localStorage.getItem('token');
    console.log("token : ", token);

    if (!token) {
        alert("You must be logged in to continue this process.");
        return;
    }

    let response = await fetch(`users/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    console.log("response : ", response);

    let parsed_response = await response.json();
    console.log("parsed_response : ", parsed_response);

    if (parsed_response.success) {
        alert(parsed_response.message);
        window.location.href = 'getdetails.html'; // Redirect to getdetails.html
        return;
    } else {
        alert(parsed_response.message);
        return;
    }
}



async function finduser() {

    console.log("keyword function is working...");

    let keyword = document.getElementById('searchbar').value;

    console.log("searchbar data :", keyword);

    const token = localStorage.getItem('token');
    console.log("token : ", token);

    let response = await fetch(`users?keyword=${encodeURIComponent(keyword)}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    console.log("response : ", response);

    // let parsed_response = await response.json();
    // console.log("parsed_response : ", parsed_response);
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
            rows =
                rows +
                `
        <tr>
                  <td><input class="in" type="text" id='name-${res.data[i]._id}' value="${firstName}" disabled="true" placeholder="name"></td>
                  <td><input class="in" type="text" id='username-${res.data[i]._id}' value="${lastName}" disabled=true placeholder="username"></td>
                  <td><input class="in" type="email" id='email-${res.data[i]._id}' value="${email}" disabled=true placeholder="email"></td>
                  <td><button onclick="handleView('${res.data[i]._id}')" id="viewbutton">View</button></td>
        </tr>
            `;
        }
        console.log("rows : ", rows);
        dataContainer.innerHTML = rows;
    }

    if (response.success) {
        console.log(parsed_response.message);
    } else {
        console.log(response.message);
    }

}



function logout() {
    fetch('/logout', {
        method: 'GET',
        credentials: 'include' // Include cookies in the request
    })
        .then(response => response.json())
        .then(data => {
            if (data.statusCode === 200) {
                clearConsole();
                window.location.href = '/index.html'; // Redirect to login page after logout
            } else {
                alert('Logout failed');
            }
        })
        .catch(error => console.error('Error:', error));
}

function clearConsole() {
    console.clear();
}