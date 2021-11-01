<script context="module">
    import {jwt} from "../../../stores/jwt";

    export async function load({page}) {
        // console.log("page.params.id", page.params.id);
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
        // console.log("groupmessages", groupmessages);

        
        return {props: {groupmessages}};
          

    }
        setInterval(load, 1000);

</script>

<script>
    import {page} from '$app/stores'
    export let groupmessages;
    $: meh = groupmessages;
    let message;
    
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
            console.log("consoling data", data);
   
          
        } catch (err){
            console.log(err)
        } 
        
    };

    
    
</script>

<!-- <h1> Group {`${groupmessages[0].groupid}'s`} Messages</h1> -->

{#each meh as {created_at, groupid, message, userid}}
<p>{message}</p>
{/each} 

<form on:submit|preventDefault={submit}>
    <input placeholder="Write a message" bind:value={message}>
</form>

<!-- const fetchMessage = async() => {

if (njwt) {
    setInterval(fetchMessage, 7000);
}  -->