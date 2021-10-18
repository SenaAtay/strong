<script>
    import { goto } from '$app/navigation';
    import {jwt} from "/src/stores/jwt.js";
    let email;
    let password;

  //   const submitForm = async () =>{
  //       var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   var raw = JSON.stringify({
  //     "email": email,
  //     "password": password
  //   });

  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow'
  //   };

  //   fetch("https://strengthn.herokuapp.com/auth/login/", requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
      
  //     // if (result.ok){
  //     //   goto('/dash/dashboard');
  //     // }

  //     // console.log("consoling", result)
  // };

  const submitForm = async () =>{
        try {
            const submit = await fetch("https://strengthn.herokuapp.com/auth/login/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            }); 
            
            const predata = await submit;
            const data = await submit.json();
            //console.log("consoling data", data);
            jwt.set(data);

            if (predata.ok){
              goto('../dash/dashboard');
            }
          
        } catch (err){
            console.log(err)
        } 
    };

</script>
<h1 class= "welc">Welcome Back</h1>
<body>
<form on:submit|preventDefault = {submitForm}>
<div class="container">
<!-- <form on:submit|preventDefault = {submitForm}> -->
<input type = "email" name = "email" placeholder = "Email" bind:value={email}>
<input type = "password" name = "password" placeholder = "Password" bind:value={password}>
<input type="submit" value = "Sign In" class = "signin">
<a href="/pre/createaccount">  
    <input type="submit" value = "Create Account" class = "create"/>  
</a>

</div>
</form>
</body>
<!-- </form> -->

<style>
    input{
        display: block;
        margin-bottom: 20px;
    } 

    input[type=email]{
    position: absolute;
    width: 456px;
    height: 74.55px;
    left: 532px;
    top: 317px;

    border: 2px solid #DBD3D2;
    box-sizing: border-box;
    border-radius: 9px;
    }


    input[type=password]{
    position: absolute;
    width: 456px;
    height: 74.55px;
    left: 532px;
    top: 434px;

    border: 2px solid #D2D6DB;
    box-sizing: border-box;
    border-radius: 9px;
    }

    .signin{
    position: absolute;
    width: 456px;
    height: 74.55px;
    left: 532px;
    top: 551px;
    background-color: black;
    color: white;
    font-family: Roboto;
font-style: normal;
border-radius: 9px;

    }
    
    .create{
        position: absolute;
    width: 456px;
    height: 74.55px;
    left: 532px;
    top: 651px;
    background-color: black;
    color: white;
    font-family: Roboto;
font-style: normal;
border-radius: 9px;
    }

    .welc{
        position: absolute;
width: 287px;
height: 160px;
left: 532px;
top: 107px;

font-family: Roboto;
font-style: normal;
font-weight: 500;
font-size: 65px;
line-height: 123%;
/* or 80px */


color: #000000;
    }
</style>