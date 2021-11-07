<script>
    import { onMount } from 'svelte';
   // import {jwt} from "../../../stores/jwt";
    import {page} from '$app/stores'
    $: meh = '';
    let message;

    onMount(async () => {
		const id = $page.params.id;
        let njwt;
        const unsubscribe = jwt.subscribe(value => {
            njwt = value;
        })
            const res = await fetch (`https://strengthn.herokuapp.com/user/messages/${id}`, {
            method: "GET",
            headers:{
                'Content-Type': 'application/json',
                "token": JSON.stringify(njwt),
            },
        });
        const groupmessages = await res.json();
        meh = groupmessages;
        // return {props: {groupmessages}};
    
	});

    const tryfunc = async () =>{
        const id = $page.params.id;
        let njwt;
        const unsubscribe = jwt.subscribe(value => {
            njwt = value;
        })
            const res = await fetch (`https://strengthn.herokuapp.com/user/messages/${id}`, {
            method: "GET",
            headers:{
                'Content-Type': 'application/json',
                "token": JSON.stringify(njwt),
            },
        });
        const groupmessagesA = await res.json();
        // console.log(groupmessagesA.reverse())
        meh = groupmessagesA
        return;
        // return {props: {groupmessagesA}};
    
        
    };

    const submit = async () =>{
        const id = $page.params.id;
        let njwt;
        const unsubscribe = jwt.subscribe(value => {
            njwt = value;
        })
        try {
            const submit = await fetch(`https://strengthn.herokuapp.com/user/messages/${id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "token": JSON.stringify(njwt),
                },
                body: JSON.stringify({
                    message
                }),
            });           
            const predata = await submit;
            const data = await submit.json();
          
        } catch (err){
            console.log(err)
        } 
        
    };

    setInterval(tryfunc, 100);
</script>

{#each meh as {created_at, groupid, message, userid}}
<p>{message}</p>
{/each} 

<form on:submit|preventDefault={submit}>
    <input placeholder="Write a message" bind:value={message}>
</form>














<!-- <h1> Group {`${groupmessages[0].groupid}'s`} Messages</h1> -->

<!-- <script context="module">
    import {jwt} from "../../../stores/jwt";
    export async function load({page}) {
        const id = page.params.id;
        let njwt;
        const unsubscribe = jwt.subscribe(value => {
            njwt = value;
        })
            const res = await fetch (`https://strengthn.herokuapp.com/user/messages/${id}`, {
            method: "GET",
            headers:{
                'Content-Type': 'application/json',
                "token": JSON.stringify(njwt),
            },
        });
        const groupmessages = await res.json();
        return {props: {groupmessages}};
    }
</script>

 -->

<!-- const fetchMessage = async() => {

if (njwt) {
    setInterval(fetchMessage, 7000);
}  -->