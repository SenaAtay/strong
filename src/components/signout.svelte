<script>
    import { goto } from '$app/navigation';
    import {jwt} from "/src/stores/jwt.js";

    function signOut(){
        goto('/');
        jwt.set(null);
    };
    
</script>

<button on:click|preventDefault = {signOut}>Sign Out</button>


<style>
 button{   

font-family: Roboto;
position: absolute;
top: 380px;
color:transparent;

background-color: Transparent;
    background-repeat:no-repeat;
    border: none;
    cursor:pointer;
    overflow: hidden;
    outline:none;
    color:white;



 }
</style>