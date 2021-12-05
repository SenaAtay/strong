<script>
	import { dash, loadDash } from '../../stores/dash';
	import { groupsStore, loadGroupsStore } from '../../stores/groups';
	import { onMount } from 'svelte';
	import Edit from '../../components/editMeeting.svelte';
	import { jwt } from '../../stores/jwt';

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
	let newGroupsInfo;
	let groupsInfo;
	let omg;

	onMount(async () => {
		await loadDash();
		await loadGroupsStore();
		// findGroupId(groupsInfo);

		groupsStore.subscribe((value) => {
			groupsInfo = value;
		});

	});

	let userInfo;
	dash.subscribe((value) => {
		userInfo = value;
	});



	// findGroupId(groupsInfo);



	$: newGroupsInfo = groupsInfo;
	// console.log("newgroupsinfo", newGroupsInfo)
	$: console.log(' newgroupsinfo', newGroupsInfo);
	// findGroupId(newGroupsInfo);
	$: groups = userInfo.groups;
	$: user = userInfo.user;
	// $: messages = userInfo.messages;
	// $: org = userInfo.org;
	// $: user = userInfo.user;


	// function findGroupId(groupsInfoI) {
	// 	console.log("what", groupsInfoI)
	// 	// let i;
	// 	for (let i in groupsInfoI) {
	// 		console.log("hi")
	// 		if (groupsInfoI[i].dati != null) {
	// 			console.log('groupsInfo[i].dati', groupsInfo[i].dati);
	// 			let iterDate = groupsInfoI[i].dati.replace('T', '-').split('-');
	// 			let iterYear = iterDate[0];
	// 			let iterMonth = iterDate[1];
	// 			let todayDate = new Date().toISOString().slice(0, 10).split('-');
	// 			todayYear = todayDate[0];
	// 			todayMonth = todayDate[1];
	// 			if (iterYear == todayYear && iterMonth == todayMonth) {
	// 				foundGroupId = groupsInfo[Ii].groupid;
	// 				console.log('foundGroupId', foundGroupId);
	// 			}
	// 		}
		
	// 	}
	// 	return;
	// }

	$: {
		for (let i in newGroupsInfo) {
			// console.log("hi")
			if (newGroupsInfo[i].dati != null) {
				// console.log('groupsInfo[i].dati', newGroupsInfo[i].dati);
				let iterDate = newGroupsInfo[i].dati.replace('T', '-').split('-');
				let iterYear = iterDate[0];
				let iterMonth = iterDate[1];
				let todayDate = new Date().toISOString().slice(0, 10).split('-');
				todayYear = todayDate[0];
				todayMonth = todayDate[1];
				if (iterYear == todayYear && iterMonth == todayMonth) {
					foundGroupId = newGroupsInfo[i].groupid;
					console.log('foundGroupId', foundGroupId);
				}
			}
		
		}
		
	}

	function fixDate(dateV) {
		if (dateV == null) {
			return;
		} else {
			let dateR = dateV.replace('T', '-').split('-');
			return `${dateR[1]}-${dateR[2]}-${dateR[0]}`;
		}
	}

	function fixTime(timeV) {
		if (timeV == null) {
			return;
		} else {
			let timeR = timeV.split(':');

			return `${timeR[0]}:${timeR[1]}`;
		}
	}

	function fixMembers(theMembers){
		let finalMembersHTML = "";
		console.log(theMembers)
		for (let i = 0; i<theMembers.length; i++){
			if (theMembers[i] == `${user[0].fname} ${user[0].lname}`){
				theMembers.splice(i, 1);
				
				for (let member in theMembers){
					let membersHTML = `
				<h3 style="margin-bottom: 3%;font-family: Roboto;font-weight: 500;">${theMembers[member]}</h3>
				`;
				finalMembersHTML += membersHTML

				}
				// console.log("new", theMembers)
				// let el = document.getElementById("lm").children;
				// el.removeChild(el.childNodes[0]); 

				// el.prepend(membersHTML) 

				// console.log("el", el)

				// console.log(document.getElementById("lastMinuteT"))
				// console.log(document.getElementById(" yourStrengthSection"))
				// return theNewMembers;
			}

		}
		return finalMembersHTML
		// theMembersTwo = theMembers.replace(`${user[0].fname} ${user[0].lname},`, "").split(',')
		// console.log(theMembersTwo)



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
			// console.log('bruh if this works', bruh);
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
		if (locationA == undefined) {
			locationA = location;
		}

		if (groupName == undefined) {
			groupName = name;
		}

		if (date == undefined) {
			date = dateP;
		}

		if (endTime == undefined) {
			endTime = endTimeP;
		}

		if (startTime == undefined) {
			startTime = startTimeP;
		}

		Reactive = false;
		savedHTML = '';
		submit(event.detail.eGroupIdV);
		let element = document.getElementById(`${event.detail.eGroupIdV}`);

		element.innerHTML = `
		<h3 class="groupName" id="groupName" style= "color: #293b5f;font-family: 'Raleway', sans-serif;font-weight: 500; font-size: 25px;">${upperCase(
			groupName
		)}</h3>

		<div class="date" style = "color: black;
		font-family: 'Raleway', sans-serif;
		font-weight: 400;
		font-size: 23px;">
			<p id="date">${fixDate(date)}</p>
		</div>

		<div class="time" style ="display: flex;flex-direction: row;align-content: space-between;gap: 30px; color: black;font-family: 'Raleway', sans-serif;font-weight: 400;font-size: 22px;">
			<p><span id="startTime" >${fixTime(startTime)}</span>-<span id="endTime">${fixTime(
			endTime
		)}</span></p>
		</div>

		<div class="location" style = "		color: black;
		font-family: 'Raleway', sans-serif;
		font-weight: 400;
		font-size: 20px;">
			<p id="location">${locationA}</p>
		</div>`;
		element.style.visibility = 'visible';

		let bruh = document.getElementById(`${event.detail.eGroupIdV}inputs`);
		bruh.style.visibility = 'hidden';

		Reactive = true;
	}

	const submit = async (id) => {
		// console.log(id);
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

{#if groups == undefined}
	<h1>You have no meetings scheduled</h1>
{:else}
	<div class="topSection">
		<div class="meetGroupSection" >
			<h3 class="topText">Meet your Group</h3>
			<!-- <div class= "lastMinute">
				<h3 class="lastMinName">Noel Fernandez</h3>
				<h3 class="lastMinName">Brooke Gray</h3>
				<h3 class="lastMinName">Nick Arya</h3>
				<h3 class="lastMinName">Selin Flores</h3>
				<h3 class="lastMinName">Marcos Miles</h3>
				<h3 class="lastMinName">Rashid Ahmed</h3>
			</div> -->
			<div class= "lastMinute" > 
			{#if newGroupsInfo != undefined || newGroupsInfo != null}
				{#each newGroupsInfo as { dati, endtime, groupid, groupname, loc, members, orgid, starttime }, i}
					{#if newGroupsInfo[i].groupid == foundGroupId}
					<!-- {newGroupsInfo[i].members} -->
					<div class= "hiSena">
					{@html fixMembers(newGroupsInfo[i].members)}
				</div>

				<!-- <p style="margin-bottom: 3%;font-family: Roboto;font-weight: 500;">{member}</p> -->

					{/if}
				{/each}
			{/if}
		</div>
		</div>
		<div class="yourStrengthSection" >
			<h3 class="topText">Your Strength</h3>
			<div class="number"><p><span style="font-size: 42px">20</span> Connections</p></div>
			<div class="percentage"><p><span style="font-size: 42px">10%</span> Group Met</p></div>
		</div>
		<div>
			<img alt="network" src="/network.png" />
		</div>
	</div>
	<div class="cardHead">
		<h3 class="upcoming">Upcoming Meetings</h3>
		<div class="cardBody">
			{#each userInfo.groups as { starttime, endtime, groupname, loc, dati, groupid }}
				{#if starttime != null}

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
								<p class="work">
									<span id="startTime">{fixTime(starttime)}</span>-<span id="endTime"
										>{fixTime(endtime)}</span
									>
								</p>
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

						
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
{/if}

<style>
	* {
		margin: 0;
	}

	.replace {
		text-align: center;
	}

	.work {
		margin-left: 6%;
	}

	.lastMinName {
		margin-bottom: 3%;
	}

	.lastMinute {
		/* padding: 50px; */
		padding-top: 14%;
		text-align: center;
		
		font-family: Roboto;
		font-weight: 500;
	}

	img {
		width: 480px;
		height: 333px;
		margin-left: 8%;
		margin-top: 6%;
		margin-bottom: 0%;
		cursor: pointer;
	}

	.topSection {
		display: flex;
		margin-left: 19%;
		margin-top: 3%;
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
		margin-top: 2.3%;
		padding: 20px;
		width: 78%;
		height: 320px;
		background: #dbe6fd;
		border-radius: 20px;
	}

	.yourStrengthSection {
		/* background-color: blue; */
		margin-left: 5%;
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
		margin-left: 10%;
	}

	.location {
		color: black;
		font-family: 'Raleway', sans-serif;
		font-weight: 400;
		font-size: 20px;
	}
</style>


	<!-- const unsubscribe = dash.subscribe((value) => {
		userInfo = value;
	});

	let groupsInfo;
	groupsStore.subscribe((value) => {
		groupsInfo = value;
	}); -->
