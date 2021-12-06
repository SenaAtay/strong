<script>
	import { jwt } from '/src/stores/jwt.js';
	import { goto } from '$app/navigation';
	import { fade, slide, scale, fly } from 'svelte/transition';

	let fname;
	let lname;
	let email;
	let password;

	const submitForm = async () => {
		try {
			const submit = await fetch('https://strengthn.herokuapp.com/auth/register/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					fname,
					lname,
					email,
					password
				})
			});

			const predata = await submit;
			const data = await submit.json();
			console.log(data);
			console.log(data.msg);
			// console.log('consoling dat', data);
			jwt.set(data);
			// console.log(data.ok);
			if (predata.ok) {
				goto('../dash/dashboard');
			}
			if (data.msg == 'User already exists.') {
				reveal();
			}
		} catch (err) {
			console.log(err);
		}
	};

	function reveal() {
		//var div = document.createElement('div');
		var div = document.getElementById('main');
		div.style.visibility = 'visible';
		// div.style.color = 'Red';
		// div.innerHTML = 'User already exists.';

		// var el = document.getElementById('main').appendChild(div);

		// setTimeout(function () {
		// 	el.remove();
		// }, 3000);
	}
</script>

<body in:fly={{ x: -5, duration: 500, delay: 500 }} out:fly={{ x: 5, duration: 500 }}>
	<a href="/">
		<img alt="logo" src="/blacklogo.png" />
	</a>
	<h1 class="intro">Let's Get Started</h1>

	<form on:submit|preventDefault={submitForm}>
		<div class="container">
			<input type="fname" name="firstname" placeholder="First Name" bind:value={fname} />
			<input type="lname" name="lastname" placeholder="Last Name" bind:value={lname} />
			<input type="text" name="email" placeholder="Email" bind:value={email} />
			<input type="password" name="password" placeholder="Password" bind:value={password} />

			<!-- <input type="submit" class= "createaccountbtn" value = "Create Account"> -->
			<div class="clearfix">
				<button type="submit" class="createaccountbtn">Create Account</button>
			</div>
			<h3>or</h3>
			<small class="one" id="main">User already exists.</small>>
			<a href="/pre/signin">
				<button class="signin">Sign In</button>
			</a>
		</div>
	</form>
</body>

<style>
	#main {
		z-index: 10;
		visibility: hidden;
		color: red;
	}
	html,
	body {
		overscroll-behavior-y: none;
	}
	img {
		width: 40px;
		margin: 20px 0px 0px 30px;
	}

	img:hover {
		cursor: pointer;
	}

	.intro {
		position: absolute;
		width: 266px;
		height: 160px;
		left: 532px;
		top: 70px;
		font-family: Roboto;
		font-style: normal;
		font-weight: 500;
		font-size: 65px;
		line-height: 123%;
		color: #000000;
	}

	input[type='fname'] {
		position: absolute;
		width: 456px;
		height: 73px;
		left: 532px;
		top: 260px;
		border: 2px solid #d2d6db;
		box-sizing: border-box;
		border-radius: 9px;
	}
	input[type='lname'] {
		position: absolute;
		width: 456px;
		height: 73px;
		left: 532px;
		top: 340px;
		border: 2px solid #d2d6db;
		box-sizing: border-box;
		border-radius: 9px;
	}

	input[type='text'] {
		position: absolute;
		width: 456px;
		height: 74px;
		left: 532px;
		top: 420px;
		border: 2px solid #dbd3d2;
		box-sizing: border-box;
		border-radius: 9px;
	}

	input[type='password'] {
		position: absolute;
		width: 456px;
		height: 74px;
		left: 532px;
		top: 500px;
		border: 2px solid #d2d6db;
		box-sizing: border-box;
		border-radius: 9px;
	}

	input[type='text']:focus,
	input[type='password']:focus {
		background-color: #ddd;
		outline: none;
	}

	.createaccountbtn {
		position: absolute;
		font-family: Roboto;
		width: 456px;
		height: 73.55px;
		left: 532px;
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

	.container {
		padding: 16px;
	}

	.clearfix::after {
		content: '';
		clear: both;
		display: table;
	}

	.signin {
		position: absolute;
		width: 456px;
		height: 73.55px;
		left: 532px;
		top: 730px;

		background-color: transparent;
		border: 2px solid #555555;
		background-color: white;
		box-sizing: border-box;
		border-radius: 9px;
	}

	.signin:hover {
		border-color: lightgrey;
	}

	h3 {
		position: absolute;
		width: 456px;
		height: 73.55px;
		left: 745px;
		top: 690px;
		font-family: Roboto;
	}
	#main {
		position: absolute;
		font-family: Roboto;
		width: 456px;
		height: 73.55px;
		left: 532px;
		top: 580px;
		text-align: center;
	}
	/* a,
	a.logo {
		text-decoration: none;
		color: black;
	} */
</style>
