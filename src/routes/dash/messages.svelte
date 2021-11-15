<svelte:head>
    <title>Messages</title>
</svelte:head>

<script>
  import {messages, loadMessages} from "../../stores/message";
  import Messagenav from "../../components/messagesnav.svelte";
  import {userID} from "../../stores/userid";
  import {jwt} from "../../stores/jwt";
  import { onMount } from "svelte";
  import { groupidS } from "../../stores/groupid"
  $: meh = '';
  let message;
  let dummy;
  let navOpen = false;

  console.log($groupidS)
function scrollFunc(){
    var element = document.getElementById('chatbox');
    element.scrollTop = element.scrollHeight;
}

function squish(){
    navOpen = !navOpen;
}

function replace (event){
    groupidS.set((event.detail.groupidD).toString());
    console.log($groupidS)

}

// onMount(async() => {
//     await loadMessages();
//     if ($groupidS == '0'){
//         groupidS.set(($messages[0].groupid).toString())
       
//     } 
//     const res = await fetch (`https://strengthn.herokuapp.com/user/messages/${$groupidS}`, {
//         method: "GET",
//         headers:{
//             'Content-Type': 'application/json',
//             "token": JSON.stringify($jwt),
//         },
//     });
//     const groupmessages = await res.json();
//     meh = Object.values(groupmessages).reverse();
    
    

// })


    
const realTime = async () =>{

    await loadMessages()

    if ($groupidS == '0'){
        groupidS.set(($messages[0].groupid).toString())  
    } 
    

    const res = await fetch (`https://strengthn.herokuapp.com/user/messages/${$groupidS}`, {
        method: "GET",
        headers:{
            'Content-Type': 'application/json',
            "token": JSON.stringify($jwt),
        },
    });
    
    const groupmessagesA = await res.json();
    meh = Object.values(groupmessagesA).reverse();
    
    
    return;
};

// function check(){
//     if (message === ""){
//         return;
//     } else {
//         submit();
//     }
// }

const submit = async () =>{
    try {
        const submit = await fetch(`https://strengthn.herokuapp.com/user/messages/${$groupidS}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "token": JSON.stringify($jwt),
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

    message=""; 
    scrollFunc()
};

setInterval(realTime, 100);
    
</script>

<Messagenav on:hamburger={squish} on:groupchat={replace} />
<div id = "squishThis">
    {#if $groupidS == undefined || $groupidS == "0"}
    <h1 class="title"> </h1>
    <h1 class="title"> </h1>
    <h1 class="title"> </h1>
    <p></p>
    <p></p>
 
    {:else}
    <h1 class="title">Group {$groupidS}</h1>
    {/if}
    <!-- <h1 class="title">Group {$groupidS}</h1> -->
    <div class = "chatbox" id = "chatbox" class:adjust={navOpen}>
        {#each meh as {created_at, groupid, message, userid}}
        {#if userid == $userID}
        <div class="wrapMyMessage">
            <p class="empty">Name</p>
            <p class = "myMessage empty">{message}</p> 
        </div>  
        {:else}
        <div class="wrapTheirMessage">
            <p class="empty">Name</p>brew install git
            <p class = "theirMessage empty">{message}</p> 
        </div> 
        {/if}
    {/each} 

    <div bind:this={dummy} class="sickofyou">
        <!-- <p>tryagainandgain</p> -->
    </div>
</div>

<form on:submit|preventDefault={submit} class:adjust={navOpen} >
    <input placeholder="....." bind:value={message}  >
    <button on:click|preventDefault={submit}>Send</button>
</form>


</div>
<style>

*{
    box-sizing: border-box;
}

.sickofyou{
    background-color: aqua;

}
#squishThis{
    

}

.title{
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
    /* Confused */
    width:25vw;
    padding:5px;
    /* margin-top: 1.5%;
    margin-bottom: 1.5%; */
    margin: 9px;
    margin-left: 14%;
}

.chatbox{
    /* which units */
    background-color: #DBE6FD;
    background-color: rgb(219, 230, 253, 0.4);
    border-radius: 10px;
    height:80vh;
    width: 80vw;
    padding: 10px;
    margin-left: 15%;
    margin-bottom: 1%;
    
    transition: 0.5s;
    
    /* understand these flexes */
    display: flex;
    flex-direction: column;
    /* Is overflow x needed?  */
    /* overflow-x: hidden; */
    overflow-y: auto;
}

.wrapMyMessage{
    /* which units */
    display: flex;
    justify-content: flex-end;
    margin: 11px;
}

.myMessage{
    /* which units */
    background-color:#47597E ;
    color: #FFFFFF;
    font-size: 13px;
    border-radius: 10px;
    padding: 11px;
    margin: 11px;
    display: flex;
    /* are these needed? */
    /* align-items: flex-start; */
    /* flex-basis: row wrap; */
}

.wrapTheirMessage{
    /* which units */
    display: flex;
    justify-content: flex-start;
    margin: 11px;
    
}

.theirMessage{
    /* which units */
    background-color:#FFFFFF;
    color: #000000;
    font-size: 13px;
    border-radius: 10px;
    padding: 11px;
    display: flex;
    /* understand these flexes */
    /* align-items: flex-start;
    flex-basis: row wrap; */   
}

form{
    height: 6vh;
    width: 80vw;
    margin-left: 15%;
    display: flex;
    transition: 0.5s;
    
    /* border-top: 1px;   */
    /* margin: 5px; */
    /* margin: 10px 10px 10px 10px; */  
}

form input{
    flex: 1;
    margin-right: 15px;
    border-color: DCDCDC;
    border-width: thin;
    outline: none;
    background-color:#FFFFFF;
    /* border: none; */
    font-size: 12px;
    border-radius: 10px;
    padding: 11px;
}

form button{
    background: rgba(71, 89, 126, 0.48);
    color: #FFFFFF;
    border: 2px solid rgba(220, 220, 220, 0.25);
    border-radius: 5px;
    padding: 2px 35px;
    /* background-color: fade(#47597E, 48%); */  
}

.adjust{
    width:66vw;
}

</style>


  
 






























