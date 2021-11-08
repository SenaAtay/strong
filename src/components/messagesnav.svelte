<script lang="ts">
    import { Button, Offcanvas } from 'sveltestrap';
    let open = false;
    const toggle = () => (open = !open);
    import {messages} from "../stores/message";
    import { loadMessages } from "../stores/message";
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';
    

   
  onMount(async() => {
      loadMessages();
  })

  let userInfo;
      const unsubscribe = messages.subscribe(value => {
      userInfo = value;
  })

  // function gotoChat (){
  //   goto(`../routes/dash/messages/${groupid}`)
  // };

  </script>
  
  <div >
    <div class="button">
      <Button on:click={toggle}  >
        Open Offcanvas
      </Button>

    </div>

     

   
   
  
    <Offcanvas scroll isOpen={open} {toggle} backdrop={false} placement="end" >
    {#if userInfo == undefined} 
    <h1>You have no messages</h1>
    {:else}
    {#each userInfo as {created_at, groupid, message, userid}}
    <div on:click= {() => goto(`/dash/messages/${groupid}`)} class="groupchat" >
    <h1>Group {groupid}</h1>
    <p>{message}</p>
    </div>
    {/each}
    {/if}
    </Offcanvas>
  </div>

  <style>

   

    .button{
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      margin-right: 10px;
      
    }
    .groupchat{
      font-family: Raleway;
      padding: 10px;
      cursor:pointer;
    }
    .groupchat:hover{
      background-color: #82A7A6;
    }


  </style>

  