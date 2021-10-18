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
</script>

<script>
    export let groupmessages;
    $: meh = groupmessages;
    // console.log(groupmessages[0].groupid);
    
</script>

<!-- <h1> Group {`${groupmessages[0].groupid}'s`} Messages</h1> -->

{#each meh as {created_at, groupid, message, userid}}
<p>{message}</p>
{/each} 


