<script>
	import { fade, slide, scale, fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { jwt } from '/src/stores/jwt.js';

	function signOut() {
		
	
		jwt.set(null);
		goto('/');
	
	}
</script>

<body in:fly={{ x: -5, duration: 500, delay: 500 }} out:fly={{ x: 5, duration: 500 }}>
<button on:click|preventDefault={signOut}>Sign Out</button>
</body>

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
