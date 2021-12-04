<script>
	import { dash } from '../../stores/dash';
	import { loadDash } from '../../stores/dash';
	import { onMount } from 'svelte';
	import Edit from '../../components/editMeeting.svelte';

	let showInputs = false;
	let savedHTML;
	let name;
	let date;
	let startTime;
	let endTime;
	let location;
	let newName;
	let newDate;
	let newStartTime;
	let newEndTime;
	let newLocation;

	function editFunc(event) {
		let element = document.getElementById(`${event.detail.eGroupIdV}`);
		console.log('element', element);

		savedHTML = element.innerHTML;
		name = document.getElementById('groupName').innerHTML;
		date = document.getElementById('date').innerHTML;
		startTime = document.getElementById('startTime').innerHTML;
		endTime = document.getElementById('endTime').innerHTML;
		location = document.getElementById('location').innerHTML;
		element.innerHTML = '';
		showInputs = true;
		// console.log("savedHTML", savedHTML);
		// console.log("name", name);
		// console.log("startTime", startTime);
		// console.log("endTime", endTime);
		// console.log("location", location);

		// 	element.innerHTML = `
		// 	<input placeholder="Name" value=${name} bind:value={newName}>
		// 	<input placeholder="Date" value=${date} bind:value={newDate}>
		// <input placeholder="Start Time" value=${startTime} bind:value={newStartTime}>
		// <input placeholder="End Time" value=${endTime} bind:value={newEndTime}>
		// <input placeholder="Location" value=${location} bind:value={newLocation}>
		// 	`;
	}

	function xFunc(event) {
		let element = document.getElementById(`${event.detail.eGroupIdV}`);
		element.innerHTML = savedHTML;
		showInputs = false;
	}

	function cFunc(event) {
		alert('cFunc');
		console.log(newName);

		let element = document.getElementById('replace');
	}

	onMount(async () => {
		loadDash();
	});
	let userInfo;
	const unsubscribe = dash.subscribe((value) => {
		userInfo = value;
	});
	$: console.log(userInfo);
	$: groups = userInfo.groups;
	$: messages = userInfo.messages;
	$: org = userInfo.org;
	$: user = userInfo.user;

	function upperCase(name) {
		let casedName = name.charAt(0).toUpperCase() + name.slice(1);
		return casedName;
	}
</script>

<!-- {#if user == undefined}
	<p>loading</p>
{:else}
	<h3 class="intro">Hi, {user[0].fname} {user[0].lname}</h3>
{/if} -->

{#if groups == undefined}
	<h1>You have no meetings scheduled</h1>
{:else}
	<!-- <h2 style="color:aqua">Meetings</h2> -->
	<div class="topSection">
		<div class="meetGroupSection">
			<h3 class="topText">Meet your Group</h3>
		</div>
		<div class="yourStrengthSection">
			<h3 class="topText">Your Strength</h3>
			<div class="number"><p><span style="font-size: 42px">#</span> Connections</p></div>
			<div class="percentage"><p><span style="font-size: 42px">#%</span> Group Met</p></div>
		</div>
	</div>
	<div class="cardHead">
		<h3 class="upcoming">Upcoming Meetings</h3>
		<div class="cardBody">
			{#each groups as { starttime, endtime, groupname, loc, dati, groupid }}
				<!-- <div class="rectangle" /> -->
				{#if starttime != null}
					<!-- <div class="outterCardBody"> -->

					<div class="box">
						<Edit eGroupId={groupid} on:edit={editFunc} on:x={xFunc} on:c={cFunc} />
						<div class="replace" id={groupid}>
							<h3 class="groupName" id="groupName">{upperCase(groupname)}</h3>

							<div class="date">
								<p id="date">date</p>
							</div>

							<div class="time">
								<p><span id="startTime">{starttime}</span>-<span id="endTime">{endtime}</span></p>
							</div>

							<div class="location">
								<p id="location">{loc}</p>
							</div>
						</div>
						<div>
							<input
								class:inputs={!showInputs}
								class:changeVis={showInputs}
								placeholder={upperCase(groupname)}
								bind:value={newName}
							/>
							<input
								class:inputs={!showInputs}
								class:changeVis={showInputs}
								placeholder={date}
								bind:value={newDate}
							/>
							<input
								class:inputs={!showInputs}
								class:changeVis={showInputs}
								placeholder={starttime}
								bind:value={newStartTime}
							/>
							<input
								class:inputs={!showInputs}
								class:changeVis={showInputs}
								placeholder={endtime}
								bind:value={newEndTime}
							/>
							<input
								class:inputs={!showInputs}
								class:changeVis={showInputs}
								placeholder={loc}
								bind:value={newLocation}
							/>
						</div>
					</div>

					<!-- </div> -->
				{/if}
			{/each}
		</div>
	</div>
{/if}

<style>
	* {
		margin: 0;
	}

	.changeVis {
		visibility: visible;
	}

	.inputs {
		visibility: hidden;
	}

	.topSection {
		display: flex;
		margin-left: 19%;
		margin-top: 2%;
	}
	.topText {
		font-family: 'Raleway', sans-serif;
		color: #283a5c;
		font-weight: 100px;
		font-size: 35px;
		margin-bottom: 2%;
	}
	.cardHead {
		display: flex;
		flex-direction: row;
		margin-left: 19%;
		margin-top: 4.5%;
		padding: 20px;
		width: 78%;
		height: 320px;
		background: #dbe6fd;
		border-radius: 20px;
	}

	.meetGroupSection {
		/* background-color: brown; */
	}
	.yourStrengthSection {
		/* background-color: blue; */
		margin-left: 15%;
	}

	.yourStrengthSection p {
		font-size: 30px;
	}

	.number {
		width: 300px;
		height: 115px;
		text-align: center;
		background: rgba(71, 89, 126, 0.48);
		border-radius: 14px;
		color: #ffffff;
		font-family: Roboto;
		font-weight: 500;
		/* font-size: 27px; */
		padding-top: 8%;
		margin-top: 13%;
		margin-bottom: 9%;
	}
	.percentage {
		width: 300px;
		height: 115px;
		text-align: center;
		/* background-color: ; */
		background: rgba(219, 230, 253, 0.48);
		border-radius: 14px;
		color: #47597e;
		font-family: Roboto;
		font-weight: 500;
		padding-top: 8%;
		/* font-size: 27px; */
	}
	.upcoming {
		width: 206px;
		padding-left: 3%;
		padding-right: 3%;
		margin-top: 10%;
		margin-right: 0%;
		/* font-style: normal; */
		font-family: 'Raleway', sans-serif;
		font-weight: 500;
		font-size: 35px;
		color: #293b5f;
	}

	.cardBody {
		/* color: black; */
		/* display: inline; */
		/* border-color: blue; */
		/* margin-top: 0%; */
		margin-left: 3%;
		display: flex;
	}

	.box {
		width: 250px;
		height: 250px;
		background: #ffffff;
		padding-top: 3%;
		padding-right: 5%;
		padding-left: 5%;
		padding-bottom: 5%;
		margin-top: 1%;
		margin-left: 4%;
		text-align: center;
		border: 1px solid #dbe6fd;
		border-radius: 20px;
	}

	.groupName {
		color: #293b5f;
		font-family: 'Raleway', sans-serif;
		font-weight: 500;
		font-size: 25px;
	}

	.date {
		color: black;
		font-family: 'Raleway', sans-serif;
		font-weight: 400;
		font-size: 23px;
	}
	.time {
		color: black;
		display: flex;
		font-family: 'Raleway', sans-serif;
		font-weight: 400;
		font-size: 22px;
		flex-direction: row;
		align-content: space-between;
		gap: 30px;
	}

	.location {
		color: black;
		font-family: 'Raleway', sans-serif;
		font-weight: 400;
		font-size: 20px;
	}
</style>
