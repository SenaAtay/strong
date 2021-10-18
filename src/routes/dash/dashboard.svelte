<!-- <script>
    import {jwt} from "/src/stores/jwt.js";
    import Signout from "/src/components/signout.svelte"

// console.log("i'm consoling", JSON.stringify($jwt));


const submitForm = async () =>{
    try {
        const submit = await fetch("https://strengthn.herokuapp.com/user/home", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "token": JSON.stringify($jwt)
            },
        }); 

        const data = await submit.json();
        console.log(data)
        const storedData= JSON.parse(data);
        console.log(storedData)

        
    } catch (err){
        console.log(err)
    } 
};

// console.log("after", parsedData)

</script> 
 -->

<script>
    import {dash} from "../../stores/dash";
    import Signout from "../../components/signout.svelte"
    import { loadDash } from "../../stores/dash"
    import { onMount } from "svelte";
    import Messages from "./messages.svelte";
    import { start_hydrating } from "svelte/internal";
    onMount(async() => {
        loadDash();
    })
    let userInfo;
        const unsubscribe = dash.subscribe(value => {
        userInfo = value;
    })
    $: console.log(groups)
    $: groups = userInfo.groups;
    $: messages = userInfo.messages;
    $: org = userInfo.org;
    $: user = userInfo.user;

</script>

{#if user == undefined} 
<p>loading</p>
{:else}
<h3>Hi, {user[0].fname} {user[0].lname}</h3>

{/if}

{#if groups == undefined} 
<h1>You have no meetings scheduled</h1>

{:else}
<h2>Meetings</h2>
{#each groups as {starttime, endtime, groupname, loc, dati}}
<div class="cards"> 
    <h3>{groupname}</h3>
    <div class="time">
        <div>
            <p>Start Time</p>
            <div>{starttime}</div>
        </div>
        
        <div>
            <p>End Time</p>
            <div>{endtime}</div>
        </div>

    </div>

    <p>where: {loc}</p>
</div>
{/each}

{/if}
    
   
    <Signout/>

<style>
    *{
        margin: 0;
      
    }
    .time {
        display: flex;
        flex-direction: row;
        align-content: space-between;
        gap: 30px;
    }
    .cards {
        max-width: 500px;
        margin: 10px;
        padding: 20px;
        background-color: rgb(213, 225, 247);
        
    }
</style>

 

