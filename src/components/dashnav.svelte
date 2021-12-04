<script>
	import Signout from '../components/signout.svelte';
	import { dash } from '../stores/dash';
	import { loadDash } from '../stores/dash';
	import { onMount } from 'svelte';

	onMount(async () => {
		loadDash();
	});

	let userInfo;
	const unsubscribe = dash.subscribe((value) => {
		userInfo = value;
		
	});
	
	$: groups = userInfo.groups;
	$: messages = userInfo.messages;
	$: org = userInfo.org;
	$: schedules = userInfo.schedules;
	$: user = userInfo.user;
</script>

<nav>
	<div class="rectangle">
		<!-- /connections.jpg -->

		<a href="/dash/dashboard"><img class="logo" alt="logo" src="/whitelogo.png" /></a>
		<!-- <img class="profilepic" alt="profilepic" src="/profilepic.jpg" /> -->
		<div class="profilepic" />
		{#if user == undefined}
			<p />
		{:else}
			<div class="nameNLogo">
				<h1>{user[0].fname} {user[0].lname}</h1>
				<a href="/dash/profile"><img class="gear" alt="profileGear" src="/gear.png" /></a>
			</div>
		{/if}

		<ul>
			<li><a class="dash" href="/dash/dashboard">Dashboard</a></li>
			<li><a href="/dash/messages">Messages</a></li>
			<li><a href="/dash/schedules">Schedules</a></li>
			<!-- <li><a href="/dash/profile">Profile</a></li> -->
		</ul>
		<Signout />
	</div>
</nav>

<style>
	.rectangle {
		position: absolute;
		width: 16%;
		height: 100vh;
		left: -8px;
		top: 0px;
		background: #47597e;
		box-sizing: border-box;
		border-radius: 5px;
		z-index: 100;
	}

	.logo {
		width: 20%;
		margin: 15px 0px 0px 30px;
		cursor: pointer;
	}

	.profilepic {
		width: 70%;
		height: 20%;
		background-image: url('/profilepic.jpg');
		background-size: cover;
		margin-left: 20%;
		margin-bottom: 13%;
		border-radius: 50%;
	}

	.nameNLogo {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	h1 {
		color: #ffffff;
		font-family: Roboto;
		font-weight: 200;
		font-size: 1.5vw;
		text-transform: capitalize;
		margin-right: 3%;
		margin-bottom: 0%;
	}
	.gear {
		width: 20px;
		height: 20px;
	}

	.gear:hover {
		width: 20.3px;
	}
	ul {
		text-decoration: none !important;
		list-style-type: none;
		margin: 0;
		padding: 0;
		position: absolute;
		width: 132px;

		height: 25px;
		/* left: 94px; */
		left: 30%;
		top: 450px;
		font-family: Roboto;
		font-weight: 200;
		font-size: 1.5vw;
		line-height: 29px;
		color: #ffffff;
	}

	li {
		margin-bottom: 5%;
	}
	a {
		text-decoration: none !important;
		line-height: 1.7em;
		color: white;
	}

	li a:hover {
		font-weight: 400;
	}
</style>
