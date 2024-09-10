// {
//     function handleView(id) {
//         console.log("id : ", id);
    
//         // Redirect to view page and pass id as search params
//         window.location.href = `userPage.html?id=${id}`;
//     }
    
//     // Function to load single user data for view page
//     async function loadUserData() {
//         // Get the id from search params
//         const urlParams = new URLSearchParams(window.location.search);
//         const id = urlParams.get('id');
    
//         if (id) {
//             try {
//                 const token = localStorage.getItem('token'); // Retrieve the token
//                 console.log("Access token : ", token);
//                 // Make an HTTP request to get user data
//                 let response = await fetch(`/users/${id}`, {
//                     method: "GET",
//                     headers: {
//                         'content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });
//                 let data = await response.json();
//                 console.log("user data : ", data.data);
    
//                 // Check if data.data exists and has the expected properties
//                 if (data.data) {
//                     document.getElementById('firstName').value = data.data.firstName || '';
//                     document.getElementById('lastName').value = data.data.lastName || '';
//                     document.getElementById('email').value = data.data.email || '';
//                 } else {
//                     console.error('Unexpected data structure:', data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         } else {
//             console.error('No ID found in search params');
//         }
//     }
    
//     // Call loadUserData on page load
//     window.onload = loadUserData;
//     }


async function handleSubmit(event) {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
        alert("You must be logged in to continue this process.");
        return;
    }

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const imageFile = document.getElementById('imageUpload').files[0];

    if (!imageFile) {
        alert("Please select an image to upload.");
        return;
    }

    const reader = new FileReader();
    reader.onloadend = async function() {
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');

        let data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            image: base64String
        };

        let json_data = JSON.stringify(data);

        console.log("data: ", json_data);

        let response = await fetch('/users', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: json_data,
        });

        console.log("response: ", response);

        let parsed_response = await response.json();
        console.log("parsed_response: ", parsed_response);

        if (parsed_response.success) {
            alert(parsed_response.message);
        } else {
            alert(parsed_response.message);
        }
    };

    reader.readAsDataURL(imageFile);
}

document.getElementById('uploadForm').addEventListener('submit', handleSubmit);
