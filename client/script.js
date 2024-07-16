    // let firstname = document.getElementById(`firstname`);
    // let lastname = document.getElementById(`lastname`);
    // let email = document.getElementById(`email`);
    // let password = document.getElementById(`password`);


    // let datas = {
    //     // email : document.getElementById(`email`),
    //     // password : document.getElementById(`password`),
    //     firstname,
    //     lastname,
    //     email,
    //     password,
    // };

    async function login() {
        console.log("Login ...");
    
        let datas = {
            email : 'bunny@gmail.com',
            password : 'bunny#123',
        };
    
        let json_datas = JSON.stringify(datas);
    
        let response = await fetch('/login',{
            method : "POST",
            headers :  {
                'content-Type' : 'application/json'
            },
            body : json_datas,
        });
        console.log("response : ", response);
    
        let parsed_response = await response.json();
        console.log("parsed_response : ",parsed_response);
    
        let token = parsed_response.data;
        console.log("token : ",token);
    
        if(parsed_response.success) { 
            localStorage.setItem('token',token);
    
            alert(parsed_response.message);
            return;
        }else {
            alert(parsed_response.message);
            return;
        }
    }


