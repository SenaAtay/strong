<script>
    import {jwt} from "/src/stores/jwt.js";

    let fname;
    let lname;
    let email;
    let password;

    const submitForm = async () =>{
        try {
            const submit = await fetch("https://strengthn.herokuapp.com/auth/register/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fname,
                    lname,
                    email,
                    password
                }),
            }); 
            
            
            const data = await submit.json();
            console.log(data)

            jwt.set(data);
        } catch (err){
            console.log(err)
        } 
    };

</script>

<h1 class = "intro" >Let's Get Started</h1>
<body>
<form on:submit|preventDefault = {submitForm}>
<div class="container">
<input type = "fname" name = "firstname" placeholder = "First Name" bind:value={fname} >
<input type = "lname" name = "lastname" placeholder = "Last Name" bind:value={lname} >
<input type = "text" name = "email" placeholder = "Email" bind:value={email}>
<input type = "password" name = "password" placeholder = "Password" bind:value={password}>
<!-- <input type="submit" class= "createaccountbtn" value = "Create Account"> -->
<div class="clearfix">
    <button type="submit" class="createaccountbtn">Create Account</button>
</div>
<a href="/pre/signin">  
    <!-- <input type="submit" value = "Sign In"/>   -->
    <!-- <input type="button" value = "Sign In" on:click = {"/login"}> -->
    <button>Sign In</button>
</a>
</div>
</form>
</body>

<style>

body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box}

.intro{
position: absolute;
width: 266px;
height: 160px;
left: 732px;
top: 152px;
font-family: Roboto;
font-style: normal;
font-weight: 500;
font-size: 65px;
line-height: 123%;
color: #000000;

}

input[type=fname]{
position: absolute;
width: 456px;
height: 73px;
left: 732px;
top: 328px;
border: 2px solid #D2D6DB;
box-sizing: border-box;
border-radius: 9px;
}
input[type=lname]{
position: absolute;
width: 456px;
height: 73px;
left: 732px;
top: 416px;
border: 2px solid #D2D6DB;
box-sizing: border-box;
border-radius: 9px;
}

input[type=text]{ 
position: absolute;
width: 456px;
height: 74px;
left: 732px;
top: 506px;
border: 2px solid #DBD3D2;
box-sizing: border-box;
border-radius: 9px;
}

input[type=password]{
position: absolute;
width: 456px;
height: 74px;
left: 732px;
top: 592px;
border: 2px solid #D2D6DB;
box-sizing: border-box;
border-radius: 9px;
 }

input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

button {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 10%;
  opacity: 0.9;
}
button:hover {
  opacity:1;
}

.createaccountbtn {
    position: absolute;
width: 456px;
height: 73.55px;
left: 732px;
top: 708px;
background-color: black;
}

.container {
  padding: 16px;
}

.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

</style> 

<!-- /* .signintbtn {
position: absolute;
width: 456px;
height: 73.55px;
left: 732px;
top: 708px;
background-color: black;
} */

/* @media screen and (max-width: 300px) {
  .cancelbtn, .signupbtn {
     width: 100%;
  }
} */  -->




