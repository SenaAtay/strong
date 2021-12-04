<script>
	import { fade, slide, scale, fly } from 'svelte/transition';
	import { dash } from '../../stores/dash';

	import { loadDash } from '../../stores/dash';
	import { onMount } from 'svelte';

	onMount(async () => {
		loadDash();
	});
	let userInfo;
	const unsubscribe = dash.subscribe((value) => {
		userInfo = value;
	});
	// $: console.log(groups);
	$: groups = userInfo.groups;
	$: messages = userInfo.messages;
	$: org = userInfo.org;
	$: user = userInfo.user;

	// console.log(user);
</script>

<svelte:head>
	<title>Profile</title>
</svelte:head>
{#if user != undefined}
	<h1 class="intro">Profile</h1>
	<p>Type in box to start editing values and click confirm</p>
	<div class="container">
		<input type="fname" name="firstname" placeholder={user[0].fname} />
		<input type="lname" name="lastname" placeholder=" {user[0].lname}" />
		<input type="text" name="email" placeholder="Email" />
		<input type="password" name="password" placeholder="Password" />
		<div class="clearfix">
			<button type="submit" class="createaccountbtn">Confirm Changes</button>
		</div>
	</div>
{:else}
	Loading
{/if}

<style>
	.container {
		margin-left: 20%;
	}
	input[type='fname'] {
		position: absolute;
		width: 456px;
		height: 73px;
		left: 397px;
		top: 280px;
		border: 2px solid #d2d6db;
		box-sizing: border-box;
		border-radius: 9px;
	}

	input[type='lname'] {
		position: absolute;
		width: 456px;
		height: 73px;
		left: 397px;
		top: 360px;
		border: 2px solid #d2d6db;
		box-sizing: border-box;
		border-radius: 9px;
	}

	input[type='text'] {
		position: absolute;
		width: 456px;
		height: 74px;
		left: 397px;
		top: 440px;
		border: 2px solid #dbd3d2;
		box-sizing: border-box;
		border-radius: 9px;
	}

	input[type='password'] {
		position: absolute;
		width: 456px;
		height: 74px;
		left: 397px;
		top: 520px;
		border: 2px solid #d2d6db;
		box-sizing: border-box;
		border-radius: 9px;
	}
	.intro {
		position: absolute;
		width: 143px;
		height: 56px;
		left: 397px;
		top: 180px;
		font-family: Roboto;
		font-style: normal;
		font-weight: bold;
		font-size: 48px;
		line-height: 56px;

		color: #000000;
	}

	p {
		position: relative;
		width: 295px;
		height: 21px;
		left: 397px;
		top: 240px;

		font-family: Roboto;
		font-style: normal;
		font-weight: 500;
		font-size: 12px;
		line-height: 173.19%;
		/* identical to box height, or 21px */

		letter-spacing: 0.03em;

		color: #909498;
	}

	.createaccountbtn {
		position: absolute;
		font-family: Roboto;
		width: 456px;
		height: 73.55px;
		left: 397px;
		top: 610px;
		border: 2px solid #555555;
		background-color: black;
		color: white;
		box-sizing: border-box;
		border-radius: 9px;
	}

	.createaccountbtn:hover {
		border-color: lightgrey;
	}
</style>
