
    async function handleSubmit() {
        let data = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        };
        

        console.log("firstname :",firstName);
        console.log("lastname :",lastName);
        console.log("email :",email);
        console.log("password :",password);


        let json_data = JSON.stringify(data);
    
        console.log("data : ",json_data);


        let response = await fetch('/users',{
            method : "POST",
            headers :  {
                'content-Type' : 'application/json'
            },
            body : json_data,
        });
        console.log("response : ", response);
    
        let parsed_response = await response.json();
        console.log("parsed_response : ",parsed_response);
    
        let token = parsed_response.data;
        console.log("token : ",token);
    
        if(parsed_response.success && token) { 
            localStorage.setItem('token',token);
    
            alert(parsed_response.message);
            return;
        }else {
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
        console.log("token : ",token.data);
    
        if(parsed_response.success && token) { 
            localStorage.setItem('token',token.data);
    
            alert(parsed_response.message);
            window.location.href= "admin.html";
            return;
        }else {
            alert(parsed_response.message);
            return;
        }
    }


