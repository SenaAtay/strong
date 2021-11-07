<svelte:head>
    <title>Messages</title>
</svelte:head>
<!-- <script>

import Signout from "/src/components/signout.svelte"

var myHeaders = new Headers();
myHeaders.append("token", "\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMDIxYzdhMjktNjMxMi00YThlLTk4OTQtZGEyZTc3NThiYWZmIn0sImlhdCI6MTYzNDUyMzc2OSwiZXhwIjoxNjM0NTI3MzY5fQ.C94-82dKLmICGrN1fOj5-y5Vlg_iVPFkuu1avAfj_yw\"");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "message": "yooo"
});

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://strengthn.herokuapp.com/user/messages/4", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
      
    
</script> -->



<script>
  import {messages} from "../../stores/message";
  import { loadMessages } from "../../stores/message";
  import { onMount } from "svelte";
  onMount(async() => {
      loadMessages();
  })

  let userInfo;
      const unsubscribe = messages.subscribe(value => {
      userInfo = value;
  })

  // $: messages = userInfo;
  $: console.log(userInfo)

  // // $: console.log(groups)
  // $: groups = userInfo.groups;
  // $: messages = userInfo.messages;
  // $: org = userInfo.org;
  // $: user = userInfo.user;

</script>

{#if userInfo == undefined} 
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

{/if}
<h1>Messages</h1>
  
 
