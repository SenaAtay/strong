<script>
	export let groupnameI;
	export let messageI;
	export let groupidI;
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	function dispatchGroupchat() {
		dispatch('groupchat', {
			groupidD: groupidI,
			groupnameD: groupnameI
		});
	}
</script>

<!-- <div on:click= {() => goto(`/dash/messages/${groupidI}`)} class="groupChat"> -->
<div on:click={dispatchGroupchat} class="groupChat">
	<h4>{groupnameI}</h4>
	<!-- {#if messageI == null}
		<p />
	{:else}
	{#if messageI.length>20}
	<h6>{messageI.substring(0,20)}</h6>
	{:else}
		<h6>{messageI}</h6>
	{/if}
	{/if} -->
</div>

<style>
	.groupChat {
		padding: 5px 8px 8px 32px;
		text-decoration: none;
		font-size: 10px;
		color: #f1f1f1;
		display: block;
		transition: 0.3s;
		font-family: 'Raleway', sans-serif;
		font-weight: 400;
		cursor: pointer;
	}

	/* When you mouse over the navigation links, change their color */
	.groupChat:hover {
		color: #47597e;
	}
</style>
