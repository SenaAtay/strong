<script>
    let email;
    let password;

    // const submitForm = async () =>{
    //     try {
    //         const submit = await fetch("https://strengthn.herokuapp.com/auth/login/", {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 email,
    //                 password
    //             }),
    //         }); 
    //         const data = await submit.json();
    //         console.log(data);
    //     } catch (err){
    //         console.log(err)
    //     } 
    // };

</script>
<h1>Welcome Back</h1>
<!-- <form on:submit|preventDefault = {submitForm}> -->
<input type = "text" name = "email" placeholder = "Email" bind:value={email}>
<input type = "text" name = "password" placeholder = "Password" bind:value={password}>
<input type="submit" value = "Sign In">
<a href="/pre/createaccount">  
    <input type="submit" value = "Create Account"/>  
</a>

<!-- </form> -->

<style>
    input{
        display: block;
        margin-bottom: 20px;
    } 
</style>