<script>
	import { fade, slide, scale, fly } from 'svelte/transition';
	let groups;
	let password;
	let organization;
	let indexMonth;
	let year;
	let result;

	const createGroups = async (groups) => {
		try {
			const submit = await fetch(`https://strengthn.herokuapp.com/admin/group`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					organization,
					groups,
					indexMonth,
					year
				})
			});
			const json = await submit.json();

			console.log(json);
			console.log(json.msg);
			if (json.msg == 'Successfully made groups') {
				reveal();
			}

			//alert(JSON.stringify(json));
			//console.log(JSON.parse(json));
			// console.log(
			// 	JSON.stringify({
			// 		organization,
			// 		groups
			// 	})
			// );
			return json;
		} catch (err) {
			console.log(err);
		}
	};
	function reveal() {
		var div = document.getElementById('main');
		div.style.visibility = 'visible';
		// var div = document.createElement('div');
		// div.style.color = 'Green';
		// div.innerHTML = 'Groups Successfully Made';

		// var el = document.getElementById('main').appendChild(div);
		setTimeout(function () {
			div.style.visibility = 'hidden';
		}, 1500);
	}

	function validateForm() {
		if (document.forms['Form'].question.value === '') {
			alert('empty');
			return false;
		}
		return true;
	}
	const GroupsFunc = (data) => {
		document.getElementById('myForm').reset();
		let groups = [];
		let lines = data.split('\n');
		for (let i = 0; i < lines.length; i++) {
			let currLine = lines[i];
			if (currLine.includes('Group')) {
				i++;
				let group = [];
				while (i < lines.length && lines[i].trim() != 0) {
					let currLine = lines[i];
					let member = currLine.trim().substring(2);
					group.push(member);
					i++;
				}
				groups.push(group);
			}
		}
		return createGroups(groups);
	};
</script>

<svelte:head>
	<title>Admin</title>
</svelte:head>
<body in:fly={{ x: -5, duration: 500, delay: 500 }} out:fly={{ x: 5, duration: 500 }}>
	<div class="top">
		<a href="/">
			<img alt="black sn logo" src="/blacklogo.png" />
		</a>
		<a href="/">
			<button class="home">Go Home</button>
		</a>
	</div>

	<form id="myForm" name="Form" onsubmit="return validateForm()" action="">
		<div class="formelem">
			<h1 class="adminText">Administrator</h1>
			<h1 class="otherText">Create new groups</h1>
			<div class="inputDiv">
				<input
					class="inputText"
					type="text"
					placeholder="Oranization Name"
					bind:value={organization}
				/>
			</div>
			<div class="inputDiv">
				<input class="inputText" type="password" placeholder="Password" bind:value={password} />
			</div>
			<div class="inputDiv">
				<input class="Year" type="number" placeholder="Year" bind:value={year} required />
				<!-- <input class="inputText last" placeholder="" bind:value={groups} /> -->
			</div>

			<label class="months" for="Month" />

			<select name="Month" id="Month" bind:value={indexMonth}>
				<option value="0">January</option>
				<option value="1">Feburary </option>
				<option value="2">March</option>
				<option value="3">April</option>

				<option value="4">May</option>
				<option value="5">June</option>
				<option value="6">July</option>
				<option value="7">August</option>

				<option value="8">September</option>
				<option value="9">October </option>
				<option value="10">November</option>
				<option value="11">December</option>
			</select>

			<div class="inputDiv">
				<textarea class="inputText last" placeholder="" bind:value={groups} required />
				<!-- <input class="inputText last" placeholder="" bind:value={groups} /> -->
			</div>
			<div class="one" id="main">Groups Successfully Made</div>
			<!-- <button on:click|preventDefault={check}>Send</button> -->
			<button id="submit" class="createGroups" on:click|preventDefault={GroupsFunc(groups)}
				>Create Groups</button
			>

			<!-- {createGroups} -->
		</div>

		<!-- //	{result} -->
	</form>
</body>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
	* {
		font-family: 'Raleway';
	}

	html {
		overflow: hidden;
		height: 100%;
	}

	body {
		height: 100%;
		overflow: auto;
	}

	#main {
		z-index: 10;
		visibility: hidden;
		color: green;
		position: relative;
		top: -10px;
		left: 240px;

		height: 10px;
	}

	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	img {
		width: 40px;
		margin: 30px 0px 0px 50px;
		cursor: pointer;
	}
	.home {
		padding: 5px;
		background-color: black;
		color: #fff;
		border-radius: 10px;
		border: none;
		padding: 10px 20px;
		margin: 30px 50px 0px 0px;
		font-size: 14px;
	}

	.createGroups {
		position: relative;
		top: -30px;
		background-color: black;
		color: #fff;
		border-radius: 10px;
		border: none;
		padding: 10px 65px;
		font-size: 14px;
	}
	.createGroups:hover {
		border-color: lightgrey;
	}
	form {
		margin-top: 50px;
	}
	.formelem {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-evenly;
		margin-top: 1%;
		margin-left: 9%;
	}
	.adminText {
		color: #909498;
		font-size: 36px;
		font-weight: 500;
		margin-bottom: 1%;
	}
	.otherText {
		font-size: 48px;
		font-weight: 500;
		margin-bottom: 2%;
	}
	.inputDiv {
		margin-bottom: 1%;
		padding-bottom: 1%;
	}
	.inputText {
		font-size: 14px;
		font-weight: 400;
		padding: 5px 10px;
		border-radius: 8px;
		width: 400px;
		border-width: thin;
	}

	.Year {
		font-size: 14px;
		font-weight: 400;
		padding: 5px 10px;
		border-radius: 8px;
		width: 200px;
		border-width: thin;
	}

	.last {
		width: 900px;
		height: 250px;
		margin-top: 2%;
	}
</style>
