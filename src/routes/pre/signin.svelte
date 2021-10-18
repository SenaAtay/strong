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
            // console.log("consoling data", data);
            jwt.set(data);

            if (predata.ok){
              goto('/dash/dashboard');
            }
          
        } catch (err){
            console.log(err)
        } 
    };

</script>
<h1>Welcome Back</h1>
<body>
<form on:submit|preventDefault = {submitForm}>
<div class="container">
<!-- <form on:submit|preventDefault = {submitForm}> -->
<input type = "text" name = "email" placeholder = "Email" bind:value={email}>
<input type = "text" name = "password" placeholder = "Password" bind:value={password}>
<input type="submit" value = "Sign In">
<a href="/pre/createaccount">  
    <input type="submit" value = "Create Account"/>  
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
</style>