<svelte:head>
    <title>Messages</title>
</svelte:head>

<script>
  import {messages} from "../../stores/message";
  import { loadMessages } from "../../stores/message";
  import {userID} from "../../stores/userid";
  import { onMount } from "svelte";
  import Messagenav from "../../components/messagesnav.svelte";
  $: meh = '';
  let message;
  import {jwt} from "../../stores/jwt";
  
  

//   onMount(async() => {
//       loadMessages();
//   })

//   let userInfo;
//       const unsubscribe = messages.subscribe(value => {
//       userInfo = value;
//   })
    // let userInfo;
    //   const unsubscribe = messages.subscribe(value => {
    //     userInfo = value;
    // })

    



    
    onMount(async() => {

        console.log("here")
        console.log("messages", $messages[0].groupid)

        // console.log("messages", $messages[0].groupid)

        loadMessages();

            const res = await fetch (`https://strengthn.herokuapp.com/user/messages/${$messages[0].groupid}`, {
            method: "GET",
            headers:{
                'Content-Type': 'application/json',
                "token": JSON.stringify($jwt),
            },
        });
        const groupmessages = await res.json();
        meh = groupmessages;
        console.log("meh1", meh);

        
    })

    
    console.log("userfid", $userID)
    console.log("meh", {meh});
    console.log("typeof", typeof $userID)
    
    const tryfunc = async () =>{
        // const id = $page.params.id;
        let njwt;
        const unsubscribe = jwt.subscribe(value => {
            njwt = value;
        })
            const res = await fetch (`https://strengthn.herokuapp.com/user/messages/${$messages[0].groupid}`, {
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
        // const id = $page.params.id;
        let njwt;
        const unsubscribe = jwt.subscribe(value => {
            njwt = value;
        })
        try {
            const submit = await fetch(`https://strengthn.herokuapp.com/user/messages/${$messages[0].groupid}`, {
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

        message="";
        


        
    };

    // function clearText(){
    //     document.getElementById('form').value = "";
    //     console.lod("CLEARING");
    // }

    setInterval(tryfunc, 100);
        

</script>

<Messagenav />
<div class = "chatbox">



{#each meh as {created_at, groupid, message, userid}}

    {#if userid == $userID}
    <div class="outterMine">
        <div class = "mine">
            <p>{message}</p> 
        </div>
    </div>  
    {:else}
    <div class="outterTheirs">
        <div class = "theirs">
            <p>{message}</p> 
        </div>
    </div> 
    {/if}
{/each} 


</div>

<!-- <div class = "form" on:submit|preventDefault={submit}> -->
    <form on:submit|preventDefault={submit}>
        <input placeholder="Write a message" bind:value={message}>
        <button on:click|preventDefault={submit}>Send</button>
    </form>
    <!-- <input type="text" placeholder="Write a message" bind:value={message}>
    <button>Send</button>
</div> -->



<style>
.chatbox{
    background-color: #DBE6FD;
    overflow-x: hidden;
    overflow-y: auto;
    border-radius: 5px;
    display: flex;
    flex-direction: column-reverse;
    padding: 10px;
    height: 645px;
    width: 98%;
    /* height: calc(100%-90px); */
    margin: 10px 10px 10px 10px;
    /* margin-bottom: 10px; */
    /* margin: 30px; */
    /* display: flex;
    flex-direction: column-reverse;
    align-items: flex-start;
    margin-bottom: 10px; */
    

}
.outterMine{
    display: flex;
    justify-content: flex-end;
    margin: 10px 0px;
}

.outterTheirs{
    display: flex;
    justify-content: flex-start;
    margin: 10px 0px;
}
.mine{
    color: #FFFFFF;
    background: #47597E;
    display: flex;
    align-items: flex-start;
    flex-basis: row wrap;
    border-radius: 10px;
    margin: 10px 10px 0;
    font-size: 12px;
    padding: 15px;
    width: 250px;
    
}

.theirs{
    background-color:#FFFFFF;
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

form{
    display: flex;
    width: 98%;
    height: 40px;
    border-top: 1px;  
    margin: 10px 10px 10px 10px;
}

form input{
    flex: 1;
    margin: 0 5px 0;
    border-color: #DCDCDC;
    background-color:#FFFFFF;
    outline: none;
    font-size: 12px;
}

form button{
    border-radius: 5px;
    padding: 2px 35px;
    border:none;
    color: #FFFFFF;
    background-color: fade(#47597E, 48%);
}

</style>




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