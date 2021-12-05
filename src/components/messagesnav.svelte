<script lang="t=js">
	import { messages } from '../stores/message';
	import { loadMessages } from '../stores/message';
	import { onMount } from 'svelte';
	import { jwt } from '../stores/jwt';
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
	import Groupchat from './groupchat.svelte';
	let groups;

	const dispatch = createEventDispatcher();
	function dispatchHamburger() {
		dispatch('hamburger');
	}

	let navOpen = false;

	export const loadGroups = async () => {
		try {
			const groupsfetch = await fetch('https://strengthn.herokuapp.com/user/groups', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					token: JSON.stringify($jwt)
				}
			});

			const groupsfetched = await groupsfetch.json();
			groups = groupsfetched;
		
		} catch (err) {
			console.log(err);
		}
	};

	const handleNav = () => {
		navOpen = !navOpen;
		dispatchHamburger();
	};

	onMount(async () => {
		await loadMessages();
		await loadGroups();
	
	});


</script>

<div id="mySidenav" class="sidenav" class:open={navOpen}>
	{#if $messages == undefined || groups == undefined}
		<h1>You have no messages</h1>
	{:else}
		{#each $messages as { created_at, groupid, message, userid }, i}
			<Groupchat
				groupidI={groups[i].groupid}
				groupnameI={groups[i].groupname}
				messageI={message}
				on:groupchat
			/>
		{/each}
	{/if}
</div>

<div class="container" on:click={handleNav} class:change={navOpen}>
	<div class="bar1" />
	<div class="bar2" />
	<div class="bar3" />
</div>

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

	/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
	@media screen and (max-height: 450px) {
		.sidenav {
			padding-top: 15px;
		}
		/* .sidenav a {
			font-size: 18px;
		} */
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
