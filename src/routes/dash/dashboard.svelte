<script>
	import { dash, loadDash } from '../../stores/dash';
	// import { loadDash } from '../../stores/dash';
	import { groupsStore, loadGroupsStore } from '../../stores/groups';
	import { onMount } from 'svelte';
	import Edit from '../../components/editMeeting.svelte';
	import { jwt } from '../../stores/jwt'

	// let showInputs = false;
	let savedHTML = '';
	let name;
	let dateP;
	let startTimeP;
	let endTimeP;
	let location;
	let groupName;
	let date;
	let startTime;
	let endTime;
	let locationA;
	let todayYear;
	let todayMonth;
	let foundGroupId;
	let Reactive = true;
	let EName;
	let EDate;
	let ESTime;
	let EETime;
	let ELocation;

	// let calismiycak = document.getElementById(`${event.detail.eGroupIdV}inputs`)
	// console.log(calismiycak);

	onMount(async () => {
		await loadDash();
		await loadGroupsStore();
		findGroupId(groupsInfo);
	});
	let userInfo;

	// const unsubscribe = dash.subscribe((value) => {
	// 	userInfo = value;
	// });

	dash.subscribe((value) => {
		userInfo = value;
	});

	let groupsInfo;
	groupsStore.subscribe((value) => {
		groupsInfo = value;
	});

	console.log("groupsInfooooo", groupsInfo);

	$: groups = userInfo.groups;
	$: messages = userInfo.messages;
	$: org = userInfo.org;
	$: user = userInfo.user;

	function findGroupId(groupsInfo) {
		for (let i in groupsInfo) {
			if (groupsInfo[i].dati != null) {
				let iterDate = groupsInfo[i].dati.replace('T', '-').split('-');
				let iterYear = iterDate[0];
				let iterMonth = iterDate[1];
				let todayDate = new Date().toISOString().slice(0, 10).split('-');
				todayYear = todayDate[0];
				todayMonth = todayDate[1];
				if (iterYear == todayYear && iterMonth == todayMonth) {
					foundGroupId = groupsInfo[i].groupid;
				}
			}
		}
		// console.log(foundGroupId)
		return;
	}

	function fixDate(dateV){
		if (dateV == null){
			return;
		} else {
		let dateR = dateV.replace('T', '-').split('-');
		return `${dateR[1]}-${dateR[2]}-${dateR[0]}`;
		}
		// console.log("consoling fixDAte", dateV)
		// let dateR = dateV.replace('T', '-').split('-');
		// return `${dateR[1]}-${dateR[2]}`;
		// return ('sena');
	}

	function fixTime(timeV){
		if (timeV == null){
			return;
		} else {
		let timeR = timeV.split(":");

		return `${timeR[0]}:${timeR[1]}`;
	}
	}

	function editFunc(event) {
		if (savedHTML == '') {
			Reactive = true;
			let element = document.getElementById(`${event.detail.eGroupIdV}`);

			savedHTML = element.innerHTML;
			name = document.getElementById('groupName').innerHTML;
			dateP = document.getElementById('date').innerHTML;
			startTimeP = document.getElementById('startTime').innerHTML;
			endTimeP = document.getElementById('endTime').innerHTML;
			location = document.getElementById('location').innerHTML;
			element.innerHTML = '';
			let bruh = document.getElementById(`${event.detail.eGroupIdV}inputs`);
			console.log('bruh if this works', bruh);
			bruh.style.visibility = 'visible';
			Reactive = false;
		} else {
			Reactive = false;
			return;
		}
	}

	function xFunc(event) {
		Reactive = false;
		let element = document.getElementById(`${event.detail.eGroupIdV}`);
		element.innerHTML = savedHTML;
		let bruh = document.getElementById(`${event.detail.eGroupIdV}inputs`);
		bruh.style.visibility = 'hidden';
		savedHTML = '';
		Reactive = true;
	}

	function cFunc(event) {
		if (locationA == undefined){
			locationA = location;
		} 

		if (groupName == undefined){
			groupName = name;
		}

		if (date == undefined){
			date = dateP;
		}

		if (endTime == undefined){
			endTime = endTimeP;
		}

		if (startTime == undefined){
			startTime = startTimeP;
		}

		Reactive = false;
		savedHTML = '';
		submit(event.detail.eGroupIdV)
		let element = document.getElementById(`${event.detail.eGroupIdV}`);
		element.innerHTML = `
		<h3 class="groupName" id="groupName">${upperCase(groupName)}</h3>

		<div class="date">
			<p id="date">${fixDate(date)}</p>
		</div>

		<div class="time">
			<p><span id="startTime">${fixTime(startTime)}</span>-<span id="endTime">${fixTime(endTime)}</span></p>
		</div>

		<div class="location">
			<p id="location">${locationA}</p>
		</div>`;
		element.style.visibility= 'visible';
		// console.log(EName)
		// console.log(EDate)
		// console.log(ESTime)
		// console.log(EETime)
		// console.log(ELocation)

		let bruh = document.getElementById(`${event.detail.eGroupIdV}inputs`);
		bruh.style.visibility = 'hidden';
		
		Reactive = true;
		
		// alert(locationA)
		// alert(endTime)

		// alert(typeof locationA)
	
	}

	const submit = async (id) => {
		console.log(id)
		try {
			const submit = await fetch(`https://strengthn.herokuapp.com/user/group/${id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					token: JSON.stringify($jwt)
				},
				body: JSON.stringify({
					loc: locationA,
					startTime,
					endTime,
					date,
					groupName
				})
			});
			const predata = await submit;
			const data = await submit.json();
			
			EName = data[0].groupname;
			EDate = data[0].dati;
			ESTime = data[0].starttime;
			EETime = data[0].endtime;
			ELocation = data[0].loc;
		} catch (err) {
			console.log(err);
		}
	};

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
			<!-- {#each groupsInfo as { groupid, members }, i}
				{#if groupsInfo[i].groupid == foundGroupId}
					{#each groupsInfo[i].members as {}, i}
						<p>{groupsInfo[i].members[i]}</p>
					{/each}
				{/if}
			{/each} -->
		</div>
		<div class="yourStrengthSection">
			<h3 class="topText">Your Strength</h3>
			<div class="number"><p><span style="font-size: 42px">#</span> Connections</p></div>
			<div class="percentage"><p><span style="font-size: 42px">#%</span> Group Met</p></div>
		</div>
		<div>
			<img alt="network" src="/network.png" />
		</div>
	</div>
	<div class="cardHead">
		<h3 class="upcoming">Upcoming Meetings</h3>
		<div class="cardBody">
			{#each userInfo.groups as { starttime, endtime, groupname, loc, dati, groupid }}
				<!-- <div class="rectangle" /> -->
				{#if starttime != null}
					<!-- <div class="outterCardBody"> -->

					<div class="box">
						<Edit
							eGroupId={groupid}
							allowEdit={Reactive}
							on:edit={editFunc}
							on:x={xFunc}
							on:c={cFunc}
						/>
						<div class="replace" id={groupid}>
							<h3 class="groupName" id="groupName">{upperCase(groupname)}</h3>

							<div class="date">
								<p id="date">{fixDate(dati)}</p>
							</div>

							<div class="time">
								<p><span id="startTime">{fixTime(starttime)}</span>-<span id="endTime">{fixTime(endtime)}</span></p>
							</div>

							<div class="location">
								<p id="location">{loc}</p>
							</div>
						</div>
						<div id={`${groupid}inputs`} style="visibility: hidden;">
							<input class="inputs" placeholder={upperCase(groupname)} bind:value={groupName} />
							<input class="inputs" placeholder={fixDate(dati)} bind:value={date} />
							<input class="inputs" placeholder={fixTime(starttime)} bind:value={startTime} />
							<input class="inputs" placeholder={fixTime(endtime)} bind:value={endTime} />
							<input class="inputs" placeholder={loc} bind:value={locationA} />

							<!-- <input class:inputs={!showInputs} class:changeVis={showInputs} placeholder={upperCase(groupname)}  bind:value={newName}>
							<input class:inputs={!showInputs} class:changeVis={showInputs} placeholder={date}  bind:value={newDate}>
							<input class:inputs={!showInputs} class:changeVis={showInputs} placeholder={starttime} bind:value={newStartTime}> 
							<input class:inputs={!showInputs} class:changeVis={showInputs} placeholder={endtime} bind:value={newEndTime}>
							<input class:inputs={!showInputs} class:changeVis={showInputs} placeholder={loc} bind:value={newLocation}> -->
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

	img {
		width: 450px;
		height: 303px;
		margin-left: 4%;
		margin-top: 10%;
		cursor: pointer;
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

	.yourStrengthSection {
		/* background-color: blue; */
		margin-left: 9%;
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
		margin-left: 2.5%;
		display: flex;
		overflow-x: scroll;
		overflow-y: hidden;
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
