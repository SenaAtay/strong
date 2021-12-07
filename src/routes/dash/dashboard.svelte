<script>
		import { fade, slide, scale, fly } from 'svelte/transition';
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
	let dateB;
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
	let groupNameA
	let dateA;
	let startTimeA;
	let endTimeA;
	let locationAA;
	let connectionSet = new Set()
	$: size = connectionSet.size
	

	onMount(async () => {
		await loadDash();
		await loadGroupsStore();
		// findGroupId(groupsInfo);

		groupsStore.subscribe((value) => {
			groupsInfo = value;
		});

	});

	// let tv; 
	// $: userInfo = tv;
	let userInfo;
	dash.subscribe((value) => {
		userInfo = value;
		
	});





	$: reactiveUserInfo = userInfo;
	$: percentage = Math.round((size/total)*100);
	$: total = userInfo.connections;
	$: newGroupsInfo = groupsInfo;
	$: groups = userInfo.groups;
	$: user = userInfo.user;



	$: {
		for (let i in newGroupsInfo) {
			
			if (newGroupsInfo[i].dati != null) {
				
				let iterDate = newGroupsInfo[i].dati.replace('T', '-').split('-');
				
				let iterYear = iterDate[0];
				let iterMonth = iterDate[1];
				let todayDate = new Date().toISOString().slice(0, 10).split('-');
				todayYear = todayDate[0];
				todayMonth = todayDate[1];
				if (iterYear == todayYear && iterMonth == todayMonth) {
					foundGroupId = newGroupsInfo[i].groupid;
					
					break;
				}
			}
		
		}
		
	}

	$: {

		if (reactiveUserInfo.connections != undefined || Object.keys(reactiveUserInfo).length != 0  ){
			total = reactiveUserInfo.connections.length -1;
			}
		}

		
		
	

	$: {
		// console.log(percentage);
		if (percentage == NaN || percentage == 'NaN' || total == 0){
			// console.log("here")
			percentage = 0;
		}
	}

	$: {
		for (let i in newGroupsInfo) {
			
			if (newGroupsInfo[i].members != null) {
				for (let j=0; j< (newGroupsInfo[i].members).length; j++ ){
					
					if (newGroupsInfo[i].members[j] != `${user[0].fname} ${user[0].lname}`){
						
						connectionSet.add(newGroupsInfo[i].members[j])
						// console.log(connectionSet.size)
						size = connectionSet.size;
						percentage = Math.round((size/total)*100);
						
					}

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

	function fixDateSubmit(dateV){
		if (dateV == null) {
			return;
		} else {

			let dateR = dateV.replace('T', '-').split('-');

			return `${dateR[2]}-${dateR[0]}-${dateR[1]}`;
			
		}
	}

	// function connectionsList(){

	// }


	// $: function connectionsList(){
	// 	console.log
		
	// }

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

		for (let i = 0; i<theMembers.length; i++){
			if (theMembers[i] == `${user[0].fname} ${user[0].lname}`){
				theMembers.splice(i, 1);
				
				for (let member in theMembers){
					let membersHTML = `
				<h3 style="margin-bottom: 3%;font-family: Roboto;font-weight: 500;">${theMembers[member]}</h3>
				`;
				finalMembersHTML += membersHTML

				}
			
			}

		}
		return finalMembersHTML




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

		groupNameA = groupName;

		dateA = dateB;

		startTimeA = startTime;

		endTimeA = endTime;
		locationAA = locationA;
		
		if (locationAA == undefined ||locationAA == "") {
			locationAA = location;
		}

		if (groupNameA == undefined || groupNameA == "") {
			groupNameA = name;
		}

		if (dateA == undefined || dateA == "") {
			dateA = dateP;
		}

		

		if (endTimeA == undefined || endTimeA == "") {
			endTimeA = endTimeP;
		}
	

		if (startTimeA == undefined || startTimeA == "") {
			startTimeA = startTimeP;
		}
	

		Reactive = false;
		savedHTML = '';
		submit(event.detail.eGroupIdV);
		let element = document.getElementById(`${event.detail.eGroupIdV}`);

		



		element.innerHTML = `
		<h3 class="groupName" id="groupName" style= "color: #293b5f;font-family: 'Raleway', sans-serif;font-weight: 500; font-size: 25px; margin-bottom:2%;">${upperCase(
			groupNameA
		)}</h3>

		<div class="date" style = "color: black;font-family: 'Raleway', sans-serif;font-weight: 400;font-size: 23px; margin-bottom:2%;">
			<p style="margin-bottom:0%;" id="date">${fixDate(dateA)}</p>
		</div>


		<div class="time" 
		style ="color:black; display: flex;	justify-content: space-around; font-family: 'Raleway', sans-serif;font-weight: 400;font-size: 22px;padding-left: 23%;
		padding-right:23%; margin-bottom:2%; text-align: center;">
			<p style="margin-bottom:2%;"><span id="startTime" >${fixTime(startTimeA)}</span>-<span id="endTime">${fixTime(endTimeA)}</span></p>
		</div>

		<div class="location" style = " color: black;font-family: 'Raleway', sans-serif;font-weight: 400;font-size: 20px;margin-bottom:2%;"><p id="location">${locationAA}</p></div>`;
		element.style.visibility = 'visible';

		let bruh = document.getElementById(`${event.detail.eGroupIdV}inputs`);
		bruh.style.visibility = 'hidden';

		Reactive = true;
		clearInput()
		
	}


	function clearInput(){
		locationA = "";
		groupName = "";
		dateB = "";
		endTime = "";
		startTime = "";

		return;

	}



	const submit = async (id) => {


		try {
			const submit = await fetch(`https://stengthn.herokuapp.com/user/group/${id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'token': JSON.stringify($jwt)
				},
				body: JSON.stringify({
					loc: locationAA,
					startTime: startTimeA,
					endTime: endTimeA,
					date: fixDateSubmit(dateA),
					groupName: groupNameA
				}),
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
<body in:fly={{ x: -5, duration: 500, delay: 500 }} out:fly={{ x: 5, duration: 500 }}>
{#if groups == undefined}
	<!-- <h1>You have no meetings scheduled</h1> -->

	<div class="topSection">
		
		<div class="meetGroupSection" >
			<h3 class="topText">Meet your Group</h3>
		</div>
		
		<div class="yourStrengthSection" >
			<h3 class="topText">Your Strength</h3>
			<div class="number"><p><span style="font-size: 42px">{size}</span> Connections</p></div>
			<div class="percentage"><p><span style="font-size: 42px">{percentage}</span> Group Met</p></div>
		</div>
		<div class = "imageDiv">
			<img alt="network" src="/network.png" />
		</div>
	</div>
	<div class="cardHead">
		<h3 class="upcoming">Upcoming Meetings</h3>
		<div class="cardBody">
		</div>
	</div>
{:else}
	<div class="topSection">
		
		<div class="meetGroupSection" >
			<h3 class="topText">Meet your Group</h3>
			<div class= "lastMinute" > 
			{#if newGroupsInfo != undefined || newGroupsInfo != null}
			
				{#each newGroupsInfo as { dati, endtime, groupid, groupname, loc, members, orgid, starttime }, i}
					{#if newGroupsInfo[i].groupid == foundGroupId}
					<!-- {newGroupsInfo}
					{newGroupsInfo[i].groupid} -->
					<!-- {newGroupsInfo[i].members} -->
					<div class= "hiSena">
					{@html fixMembers(newGroupsInfo[i].members)}
				</div>

	

					{/if}
				{/each}
			{/if}
		</div>
		</div>
		<div class="yourStrengthSection" >
			<h3 class="topText">Your Strength</h3>
			<div class="number"><p><span style="font-size: 42px">{size}</span> Connections</p></div>
			<div class="percentage"><p><span style="font-size: 42px">{percentage}%</span> Group Met</p></div>
		</div>
		<div>
			<img alt="network" src="/network.png" />
		</div>
	</div>
	<div class="cardHead">
		<h3 class="upcoming">Upcoming Meetings</h3>
		<div class="cardBody">
			
			{#each groups as { starttime, endtime, groupname, loc, dati, groupid }}
			
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
									<span id="startTime">{fixTime(starttime)}</span>-<span id="endTime">{fixTime(endtime)}</span>
						
							</div>

							<div class="location">
								<p id="location">{loc}</p>
							</div>
						</div>
						<div id={`${groupid}inputs`} class = "inputsdiv" style="visibility: hidden;">
							<input class="inputs" placeholder={upperCase(groupname)} bind:value={groupName} />
							<input class="inputs" placeholder={fixDate(dati)} bind:value={dateB} />
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
</body>

<style>
	* {
		margin: 0;
	}

	body{
		overflow-x: hidden;
	}

	.inputs{
		margin-bottom: 3%;
	}

	.inputsdiv{
		padding-top: 0%;
		padding-bottom: 20%;
		margin-bottom:10%;
	}

	.replace {
		text-align: center;
		padding-top: 4%;
	}

	/* .work {
		
		display:flex;
		justify-content: space-around;
	} */

	/* .lastMinName {
		margin-bottom: 3%;
	} */

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
		margin-left: 6%;
		margin-top: 6%;
		margin-bottom: 0%;
		cursor: pointer;
	}

	.topSection {
		display: flex;
		margin-left: 18%;
		margin-top: 3%;
	}
	.topText {
		font-family: 'Raleway', sans-serif;
		color: #283a5c;
		font-weight: 100;
		font-size: 42px;
		margin-bottom: 2%;
	}
	.cardHead {
		display: flex;
		flex-direction: row;
		margin-left: 18%;
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
		/* padding-right: 5%; */
		/* padding-left: 5%;
		padding-bottom: 5%;  */
		display: flex;
		flex-direction: column;
		margin-top: 2.5%;
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
		margin-bottom: 2%;
	}

	.date {
		color: black;
		font-family: 'Raleway', sans-serif;
		font-weight: 400;
		font-size: 23px;
		margin-bottom: 2%;
	}
	.time {
		color: black;
		display: flex;
		justify-content: space-around;
		font-family: 'Raleway', sans-serif;
		font-weight: 400;
		font-size: 22px;
		padding-left: 23%;
		padding-right:23%;
		text-align: center;
		margin-bottom: 2%;

				/* flex-direction: row;
		align-content: space-between; */
		/* gap: 30px; */
		/* margin-left: 10%; */
	}

	.location {
		color: black;
		font-family: 'Raleway', sans-serif;
		font-weight: 400;
		font-size: 20px;
		margin-bottom: 2%;
	}
</style>


	<!-- const unsubscribe = dash.subscribe((value) => {
		userInfo = value;
	});

	let groupsInfo;
	groupsStore.subscribe((value) => {
		groupsInfo = value;
	}); -->
