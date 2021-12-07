<script>
	import { jwt } from '/src/stores/jwt.js';
	import { goto } from '$app/navigation';
	import { fade, slide, scale, fly } from 'svelte/transition';

	let fname;
	let lname;
	let email;
	let password;

	const submitForm = async () => {

		let efname = fname.charAt(0).toUpperCase() + fname.slice(1);
		let lfname = lname.charAt(0).toUpperCase() + lname.slice(1);
		console.log(efname)
		console.log(lname)

		try {
			const submit = await fetch('https://stengthn.herokuapp.com/auth/register/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					fname: efname,
					lname: lname,
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

			validateForm();
		} catch (err) {
			console.log(err);
		}
	};

	function reveal() {
		//var div = document.createElement('div');
		var div = document.getElementById('main');
		div.style.visibility = 'visible';

		setTimeout(function () {
			div.style.visibility = 'hidden';
		}, 1500);
	}

	function validateForm() {
		// get all the inputs within the submitted form
		if ((document.forms['Frm'].firstname.required = false)) {
		}
		// for (var i = 0; i < inputs.length; i++) {
		// only validate the inputs that have the required attribute

		if (inputs === '') {
			alert('hi');
			// found an empty field that is required
			alert('Please fill all required fields');
			return false;
		}
		//}
		return true;

		// if (document.forms['Frm'].firstname.value === '') {
		// 	var div = document.getElementById('main2');
		// 	div.style.visibility = 'visible';
		// }

		// 	if (document.forms['Frm'].lastname.value === '') {
		// 		var div = document.getElementById('main3');
		// 		div.style.visibility = 'visible';
		// 		return false;
		// 	}

		// 	if (document.forms['Frm'].email.value === '') {
		// 		var div = document.getElementById('main4');
		// 		div.style.visibility = 'visible';
		// 	}

		// 	if (document.forms['Frm'].password.value === '') {
		// 		var div = document.getElementById('main5');
		// 		div.style.visibility = 'visible';
		// 	}

		// 	setTimeout(function () {
		// 		div.style.visibility = 'hidden';
		// 	}, 1500);
	}
</script>

<body in:fly={{ x: -5, duration: 500, delay: 500 }} out:fly={{ x: 5, duration: 500 }}>
	<a href="/">
		<img alt="logo" src="/blacklogo.png" />
	</a>
	<h1 class="intro">Let's Get Started</h1>

	<form id="form" on:submit|preventDefault={submitForm}>
		<div class="container">
			<input
				type="fname"
				name="firstname"
				placeholder="First Name"
				bind:value={fname}
				required
				oninvalid="this.setCustomValidity('Enter First Name Here')"
				oninput="this.setCustomValidity('')"
			/>
			<input
				type="lname"
				name="lastname"
				placeholder="Last Name"
				bind:value={lname}
				required
				oninvalid="this.setCustomValidity('Enter Last Name Here')"
				oninput="this.setCustomValidity('')"
			/>
			<input
				type="text"
				name="email"
				placeholder="Email"
				bind:value={email}
				required
				oninvalid="this.setCustomValidity('Enter Email Name Here')"
				oninput="this.setCustomValidity('')"
			/>
			<input
				type="password"
				name="password"
				placeholder="Password"
				bind:value={password}
				required
				oninvalid="this.setCustomValidity('Enter Password Name Here')"
				oninput="this.setCustomValidity('')"
			/>

			<!-- <input type="submit" class= "createaccountbtn" value = "Create Account"> -->
			<div class="clearfix">
				<button type="submit" class="createaccountbtn">Create Account</button>
			</div>
			<h3>or</h3>
			<div class="mainfunc">
				<small class="one" id="main"> User Already exists</small>
				<small class="one" id="main2">First Name is Required</small>
				<small class="one" id="main3">Last Name is Required</small>
				<small class="one" id="main4">Email Name is Required</small>
				<small class="one" id="main5">Password Name is Required</small>
			</div>
			<a href="/pre/signin">
				<button class="signin">Sign In</button>
			</a>
		</div>
	</form>
</body>

<style>
	.mainfunc {
		z-index: 10;
		visibility: hidden;
		color: red;

		position: absolute;
		font-family: Roboto;
		width: 456px;
		height: 10px;
		left: 532px;
		top: 580px;
		text-align: center;
	}
	#main5 {
		z-index: 10;
		visibility: hidden;
		color: red;

		position: absolute;
		font-family: Roboto;
		width: 456px;
		height: 10px;
		left: 10px;
		top: 10px;
		text-align: center;
	}

	/* #main2 {
		z-index: 10;
		visibility: hidden;
		color: red;

		position: absolute;
		font-family: Roboto;
		width: 456px;
		height: 10px;
		left: 532px;
		top: 580px;
		text-align: center;
	} */
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

	/* a,
	a.logo {
		text-decoration: none;
		color: black;
	} */
</style>
