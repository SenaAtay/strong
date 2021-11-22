<script>
	import { goto } from '$app/navigation';
	import { jwt } from '/src/stores/jwt.js';

	function signOut() {
		goto('/');
		jwt.set(null);
	}
</script>

<button on:click|preventDefault={signOut}>Sign Out</button>

<style>
	button {
		font-family: Roboto;
		position: absolute;
		top: 710px;
		left: 28%;
		color: transparent;
		font-size: 21px;
		background-color: Transparent;
		background-repeat: no-repeat;
		border: none;
		cursor: pointer;
		overflow: hidden;
		font-weight: 200;
		outline: none;
		color: white;
		
	}

	button:hover {
		font-weight: 400;
	}
</style>
