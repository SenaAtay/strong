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

	function upperCase(name) {
		let upname= (name.charAt(0)).toUpperCase() 
		return upname;
	}

</script>


<nav>
	<div class="rectangle">
		<!-- /connections.jpg -->

		<a href="/dash/dashboard"><img class="logo" alt="logo" src="/whitelogo.png" /></a>
		
		<!-- <img class="profilepic" alt="profilepic" src="/profilepic.jpg" /> -->
		<!-- <div class="profilepic" /> -->
		
		{#if user == undefined}
			<p />
		{:else} 
		
		<div class = "prof" >{upperCase(user[0].fname)} {upperCase(user[0].lname)}</div>
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

	.prof{
		width: 70%;
		height: 20%;
  border-radius: 50%;
  /* background: #2e3951; */
  background: #fff;
  font-size: 45px;
  /* color: #fff; */
  color: #2e3951;
  /* color: #fff; */
  text-align: center;
  line-height: 150px;
  margin-left: 17%;
		margin-bottom: 13%;
	}
/* 
	.profilepic {
	
		background-image: url('/profilepic.jpg');
		background-size: cover;
		
		border-radius: 50%;
	} */

	.logo {
		width: 20%;
		margin: 15px 0px 0px 30px;
		cursor: pointer;
	}
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





	.nameNLogo {
		display: flex;
		justify-content: center;
		align-items: center;
		/* width: 100px; */
		/* width: 80%;
		padding-left: 50%; */
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
