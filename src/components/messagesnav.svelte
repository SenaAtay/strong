<script lang="t=js">
	import { messages } from '../stores/message';
	import { loadMessages } from '../stores/message';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
	import Groupchat from './groupchat.svelte';

	const dispatch = createEventDispatcher();
	function dispatchHamburger() {
		dispatch('hamburger');
	}

	let navOpen = false;

	const handleNav = () => {
		navOpen = !navOpen;
		dispatchHamburger();
	};

	onMount(async () => {
		await loadMessages();
	});

	// function replace(){
	//   alert("it works")
	// }
</script>

<div id="mySidenav" class="sidenav" class:open={navOpen}>
	{#if $messages == undefined}
		<h1>You have no messages</h1>
	{:else}
		{#each $messages as { created_at, groupid, message, userid }}
			<!-- <div on:click= {() => goto(`/dash/messages/${groupid}`)} class="groupChat">
        <h3>Group {groupid}</h3>
        <h6>{message}</h6>
      </div> -->
			<Groupchat groupidI={groupid} messageI={message} on:groupchat />
		{/each}
	{/if}
</div>

<div class="container" on:click={handleNav} class:change={navOpen}>
	<div class="bar1" />
	<div class="bar2" />
	<div class="bar3" />
</div>

<!-- Add all page content inside this div if you want the side nav to push page content to the right (not used if you only want the sidenav to sit on top of the page -->


<!-- <script lang="t=js">
    import { Button, Offcanvas } from 'sveltestrap';
    let open = false;
    const toggle = () => (open = !open);
    import {messages} from "../stores/message";
    import { loadMessages } from "../stores/message";
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';
    import { createEventDispatcher } from 'svelte';

	  const dispatch = createEventDispatcher();

    function test(){
      dispatch('testagain')
    }

   
  // onMount(async() => {
  //     await loadMessages();
  // })

  let userInfo;
      const unsubscribe = messages.subscribe(value => {
      userInfo = value;
  })

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
    <div on:click= {() => goto(`/dash/messages/${groupid}`)} class="groupchat">
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
    }
    .groupchat:hover{
      background-color: #82A7A6;
    }


  </style>

   -->

<!-- <div id="main" class:pushMainToRight={navOpen}>
  ...
</div> -->
<style>
	/* The side navigation menu */
	.sidenav {
		height: 96%; /* 100% Full-height */
		width: 0%; /* 0 width - change this with JavaScript */
		position: fixed; /* Stay in place */
		z-index: 1; /* Stay on top */
		top: 2%;
		bottom: 2%;
		/* bottom: 10%; */
		right: 1%;

		border-radius: 10px;
		background-color: #869ba0; /* Black*/
		overflow-x: hidden; /* Disable horizontal scroll */
		padding-top: 30px; /* Place content 60px from the top */
		transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
	}

	/* The navigation menu links */
	/* .sidenav .groupChat {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 10px;
  color: #818181;
  display: block;
  transition: 0.3s;
} */

	/* When you mouse over the navigation links, change their color */
	/* .sidenav .groupChat:hover {
  color: #f1f1f1;
} */

	/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
	/* #main {
  transition: margin-left .5s;
  padding: 20px;
} */

	/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
	@media screen and (max-height: 450px) {
		.sidenav {
			padding-top: 15px;
		}
		.sidenav a {
			font-size: 18px;
		}
	}

	.open {
		width: 15%;
	}

	/* .pushMainToRight{
    margin-left: 40%;
  } */

	.container {
		z-index: 1;
		position: absolute;
		right: 1.3%;
		top: 3%;
		display: inline-block;
		cursor: pointer;
		width: 50px;
	}

	.bar1,
	.bar2,
	.bar3 {
		width: px;
		height: 5px;
		background-color: #47597e;
		margin: 6px 0;
		transition: 0.4s;
	}

	.change .bar1 {
		-webkit-transform: rotate(-45deg) translate(-9px, 6px);
		transform: rotate(-45deg) translate(-9px, 6px);
		background-color: #ffffff;
	}

	.change .bar2 {
		opacity: 0;
	}

	.change .bar3 {
		-webkit-transform: rotate(45deg) translate(-8px, -8px);
		transform: rotate(45deg) translate(-8px, -8px);
		background-color: #ffffff;
	}

	/* .change .container:hover {
  background-color: #47597E;
} */

	.change .bar3:hover {
		background-color: #47597e;
	}

	.change .bar1:hover {
		background-color: #47597e;
	}
</style>
