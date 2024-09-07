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