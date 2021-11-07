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
    
    import { loadDash } from "../../stores/dash"
    import { onMount } from "svelte";

    import { Button, Offcanvas } from 'sveltestrap';
  let open = false;
  const toggle = () => (open = !open);

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

<div class = "rectangle"></div>





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
    .rectangle{
        position: absolute;
        width: 339px;
        height: 1080px;
        left: -8px;
        top: 0px;

        background: #47597E;
        border: 1px solid #000000;
        box-sizing: border-box;
        border-radius: 5px;
        z-index: -1;
    }
</style>

 

