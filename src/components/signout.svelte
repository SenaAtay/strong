<script>
    import { goto } from '$app/navigation';
    import {jwt} from "/src/stores/jwt.js";

    function signOut(){
        goto('/');
        jwt.set(null);
    };
    
</script>

<button on:click|preventDefault = {signOut}>Sign Out</button>