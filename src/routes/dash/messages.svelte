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


<Messagenav />
<div class="chatbox">
	{#each meh as { created_at, groupid, message, userid }}
		{#if userid == $userID}
			<div class="outterMine">
				<div class="mine">
					<p>{message}</p>
				</div>
			</div>
		{:else}
			<div class="outterTheirs">
				<div class="theirs">
					<p>{message}</p>
				</div>
			</div>
		{/if}
	{/each}
</div>
<style>


<!-- <div class = "form" on:submit|preventDefault={submit}> -->
<form on:submit|preventDefault={submit} size="50">
	<input class="message" placeholder="Write a message" bind:value={message} />
	<button on:click|preventDefault={submit}>Send</button>
</form>

<!-- {#if userInfo == undefined} 
<h1>You have no messages</h1>

{:else}
{#each userInfo as {created_at, groupid, message, userid}}

<a href =  {`/dash/messages/${groupid}`}>
 
<div>
<h1>Group: {groupid}</h1>
<p>Most Recent Message:{message}</p>
</div>
</a>

{/each}

{/if} -->

<!-- <script>

// import Signout from "/src/components/signout.svelte"

// var myHeaders = new Headers();
// myHeaders.append("token", "\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMDIxYzdhMjktNjMxMi00YThlLTk4OTQtZGEyZTc3NThiYWZmIn0sImlhdCI6MTYzNDUyMzc2OSwiZXhwIjoxNjM0NTI3MzY5fQ.C94-82dKLmICGrN1fOj5-y5Vlg_iVPFkuu1avAfj_yw\"");
// myHeaders.append("Content-Type", "application/json");

// var raw = JSON.stringify({
//   "message": "yooo"
// });

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };

// fetch("https://strengthn.herokuapp.com/user/messages/4", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
      
    
// </script> -->

<!-- <input type="text" placeholder="Write a message" bind:value={message}>
    <button>Send</button>
</div> -->
<style>
	.chatbox {
		background-color: #dbe6fd;
		overflow-x: hidden;
		overflow-y: auto;
		border-radius: 5px;
		display: flex;
		flex-direction: column-reverse;
		padding: 10px;
		height: 645px;
		width: 50%;
		left: 500px;
		position: relative;
		/* height: calc(100%-90px); */
		margin: 10px 10px 10px 10px;
		/* margin-bottom: 10px; */
		/* margin: 30px; */
		/* display: flex;
    flex-direction: column-reverse;
    align-items: flex-start;
    margin-bottom: 10px; */
	}
	.message {
		width: 50%;
	}
	.outterMine {
		display: flex;
		justify-content: flex-end;
		margin: 10px 0px;
	}

	.outterTheirs {
		display: flex;
		justify-content: flex-start;
		margin: 10px 0px;
	}
	.mine {
		color: #ffffff;
		background: #47597e;
		display: flex;
		align-items: flex-start;
		flex-basis: row wrap;
		border-radius: 10px;
		margin: 10px 10px 0;
		font-size: 12px;
		padding: 15px;
		width: 250px;
	}

	.theirs {
		background-color: #ffffff;
		color: #000000;
		display: flex;
		align-items: flex-start;
		flex-basis: row wrap;
		border-radius: 10px;
		margin: 10px 10px 0;
		font-size: 12px;
		padding: 15px;
		width: 250px;
	}

	form {
		display: flex;
		width: 98%;
		height: 40px;
		border-top: 1px;
		margin: 10px 10px 10px 10px;
	}

	form input {
		flex: 1;
		margin: 0 5px 0;
		border-color: #dcdcdc;
		background-color: #ffffff;
		outline: none;
		font-size: 12px;
	}

	form button {
		border-radius: 5px;
		padding: 2px 35px;
		border: none;
		color: #ffffff;
		background-color: fade(#47597e, 48%);
	}
</style>

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


  
 























