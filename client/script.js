async function login(event) {
    event.preventDefault();
    console.log("Login ...");

    let datas = {
        // email : 'bunny@gmail.com',
        // password : 'bunny#123',
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
        // password: document.getElementById('password').value,
    };


    console.log("firstname :", firstName.value);
    console.log("lastname :", lastName.value);
    console.log("email :", email.value);
    // console.log("password :", password.value);


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

async function getLoginUserData() {

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
                  <td><input class="in" type="email" id='email-${res.data[i]._id}' value="${email}" disabled=true></td>
                  <td><button class="btn" onclick= "handleEdit('${res.data[i]._id}')">Edit</button></td>
                  <td><button class="btn" onclick= "handleSave('${res.data[i]._id}')">Save</button></td>
                  <td><button class="btn" onclick= "remove('${res.data[i]._id}')">remove user</button></td>
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


async function handlereset(event) {
    event.preventDefault();
    console.log("reseting password ...");
    let data = {
        // email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };
    // console.log("email :", email.value);
    console.log("password :",password.value);


    let json_data = JSON.stringify(data);

    console.log("data : ", json_data);


    let response = await fetch('/reset-password', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: json_data,
    });
    


    console.log("response : ", response);

    let parsed_response = await response.json();
    console.log("parsed_response : ", parsed_response);

    if (parsed_response.success) {
        // alert(parsed_response.message);
        return;
    } else {
        // alert(parsed_response.message);
        return;
    }
}