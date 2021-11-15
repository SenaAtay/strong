<script>
	import Signout from '../components/signout.svelte';
</script>

<nav>
	<div class="rectangle">
		<ul>
			<li><a class="dash" href="/dash/dashboard">Dashboard</a></li>
			<li><a href="/dash/messages">Messages</a></li>
			<li><a href="/dash/schedule">Schedule</a></li>
			<li><a href="/dash/profile">Profile</a></li>
			<Signout />
		</ul>
	</div>
</nav>

<style>
	.rectangle {
		position: absolute;
		/* width: 339px; */
		width: 250px;
		height: 100vh;
		left: -8px;
		top: 0px;

		background: #47597e;
		border: 1px solid #000000;
		box-sizing: border-box;
		border-radius: 5px;
		z-index: -1;
	}

	ul {
		text-decoration: none !important;
		list-style-type: none;
		margin: 0;
		padding: 0;

		position: absolute;
		width: 132px;
		height: 25px;
		left: 94px;
		top: 370px;

		font-family: Roboto;
		font-size: 25px;
		line-height: 29px;

		color: #ffffff;
	}

	li a {
		text-decoration: none !important;
		margin-bottom: 10px;
		line-height: 1.7em;
		color: white;
	}
	li a:hover {
		font-weight: bold;
	}




</style>
