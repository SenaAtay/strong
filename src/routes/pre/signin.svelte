<script>
	import { goto } from '$app/navigation';
	import { jwt } from '/src/stores/jwt.js';
	import { fade, slide, scale, fly } from 'svelte/transition';
	let email;
	let password;

	let revealOne = false;
	let revealTwo = false;

	function check() {
		revealOne = false;
		revealTwo = false;
		let errorOne = document.getElementById('one');
		let errorTwo = document.getElementById('two');
		let emailCheck = document.getElementById('emailCheck').value.trim();
		let passwordCheck = document.getElementById('passwordCheck').value.trim();

		if (emailCheck.length === 0 && passwordCheck.length === 0) {
			errorOne.innerHTML = 'Email is required';
			errorTwo.innerHTML = 'Password is required';
			revealOne = true;
			revealTwo = true;
		} else if (passwordCheck.length === 0) {
			// console.log('password check');
			errorTwo.innerHTML = 'Password is required';
			revealTwo = true;
		} else if (emailCheck.length === 0) {
			// console.log('email check');
			errorOne.innerHTML = 'Email is required';
			revealOne = true;
		} else {
			submitForm();
		}
	}

	const submitForm = async () => {
		try {
			const submit = await fetch('https://stengthn.herokuapp.com/auth/login/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email,
					password
				})
			});

			const predata = await submit;
			// console.log('predata', predata);
			const data = await submit.json();
			// console.log('data', data);
			jwt.set(data);

			if (predata.ok && jwt != null) {
				goto('../dash/dashboard');
			}
			

			revealOne = false;
			if (predata.ok === false && data.msg == 'Email does not exist') {
				let errorOne = document.getElementById('one');
				errorOne.innerHTML = data.msg;
				revealOne = true;
			}

			revealTwo = false;
			if (predata.ok === false && data.msg == 'Password is not correct') {
				let errorTwo = document.getElementById('two');
				errorTwo.innerHTML = data.msg;
				revealTwo = true;
			}

			// console.log("i'm here");
		} catch (err) {
			console.log(err);
		}
	};
</script>

<body in:fly={{ x: -5, duration: 500, delay: 500 }} out:fly={{ x: 5, duration: 500 }}>
	<a href="/">
		<img alt="logo" src="/blacklogo.png" />
	</a>
	<h1 class="welc">Welcome Back</h1>

	<form on:submit|preventDefault={check}>
		<div class="container">
			<!-- <form on:submit|preventDefault = {submitForm}> -->
			<div>
				<input type="email" name="email" placeholder="Email" id="emailCheck" bind:value={email} />
				<small class="one" id="one" class:visibility={revealOne}>bidk</small>
			</div>
			<div>
				<input
					type="password"
					name="password"
					placeholder="Password"
					id="passwordCheck"
					bind:value={password}
				/>
				<small class="two" id="two" class:visibility={revealTwo}>Error</small>
			</div>
			<input type="submit" value="Sign In" class="signin" />
			<a href="/pre/createaccount">
				<input type="submit" value="Create Account" class="create" />
			</a>
		</div>
	</form>
</body>

<style>
	img {
		width: 40px;
		margin: 20px 0px 0px 30px;
		cursor: pointer;
	}
	.welc {
		position: absolute;
		width: 287px;
		height: 160px;
		left: 532px;
		top: 107px;

		font-family: Roboto;
		font-style: normal;
		font-weight: 500;
		font-size: 65px;
		line-height: 123%;
		/* or 80px */
		color: #000000;
	}
	input {
		display: block;
		margin-bottom: 20px;
	}
	input[type='email'] {
		position: absolute;
		width: 456px;
		height: 74.55px;
		left: 532px;
		top: 317px;

		border: 2px solid #dbd3d2;
		box-sizing: border-box;
		border-radius: 9px;
	}
	input[type='password'] {
		position: absolute;
		width: 456px;
		height: 74.55px;
		left: 532px;
		top: 434px;
		border: 2px solid #d2d6db;
		box-sizing: border-box;
		border-radius: 9px;
	}
	.signin {
		position: absolute;
		width: 456px;
		height: 74.55px;
		left: 532px;
		top: 551px;
		background-color: black;
		color: white;
		font-family: Roboto;
		font-style: normal;
		border-radius: 9px;
	}

	small.one.visibility {
		visibility: visible;
	}

	small.two.visibility {
		visibility: visible;
	}

	.create {
		position: absolute;
		width: 456px;
		height: 74.55px;
		left: 532px;
		top: 651px;
		border: 2px solid #555555;
		background-color: white;
		box-sizing: border-box;
		border-radius: 9px;

		/* border: 2px solid #D2D6DB */
	}

	.create:hover {
		border-color: lightgrey;
	}

	.signin:hover {
		border-color: lightgrey;
	}

	small.one {
		position: absolute;
		display: block;
		margin-bottom: 20px;
		top: 398px;
		left: 532px;
		visibility: hidden;
		color: #8b0000;
	}

	small.two {
		position: absolute;
		display: block;
		margin-bottom: 20px;
		top: 512px;
		left: 532px;
		visibility: hidden;
		color: #8b0000;
	}

	/* a,
	a.logo {
		text-decoration: none;
		color: black;
	} */
</style>
