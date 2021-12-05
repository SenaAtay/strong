<script>
	import { fade, slide, scale, fly } from 'svelte/transition';
	import { messages, loadMessages } from '../../stores/message';
	import { groupsStore, loadGroupsStore } from '../../stores/groups';
	import Messagenav from '../../components/messagesnav.svelte';
	import { userID } from '../../stores/userid';
	import { jwt } from '../../stores/jwt';
	import { onMount } from 'svelte';
	import { groupidS } from '../../stores/groupid';
	$: meh = '';
	let message;
	let dummy;
	$: groupnameA = '...';
	let navOpen = false;
	let fixGroupName;

	function scrollFunc() {
		var element = document.getElementById('chatbox');
		element.scrollTop = element.scrollHeight;
	}

	function squish() {
		navOpen = !navOpen;
	}

	function replace(event) {
		groupidS.set(event.detail.groupidD.toString());
		groupnameA = event.detail.groupnameD.toString();
		realTime();
	}

	const realTime = async () => {
		await loadGroupsStore();
		await loadMessages();
		// console.log($groupsStore);

		try {
			const res = await fetch(`https://strengthn.herokuapp.com/user/messages/${$groupidS}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					token: JSON.stringify($jwt)
				}
			});

			const groupmessagesA = await res.json();
			meh = Object.values(groupmessagesA).reverse();

			// if ($groupidS != meh[0].groupid) {
			// console.log("s", $groupidS)
			// console.log("m", meh[0].groupid)
			// for (let group in $groupsStore) {
			// 	if (meh[0].groupid == $groupsStore[group].groupid) {
			// 		groupnameA = $groupsStore[group].groupname;
			// 	}
			// }
			// }

			// for (let group in $groupsStore) {
			// 	if (meh[0].groupid == $groupsStore[group].groupid) {
			// 		groupnameA = $groupsStore[group].groupname;
			// 	}
			// }

			// yeter()

			// console.log("printing meh again",  meh[0].groupid)
		} catch (err) {
			try {
				const res = await fetch(
					`https://strengthn.herokuapp.com/user/messages/${$messages[0].groupid.toString()}`,
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							token: JSON.stringify($jwt)
						}
					}
				);

				const groupmessagesA = await res.json();
				meh = Object.values(groupmessagesA).reverse();
				// 	for (let group in $groupsStore) {
				// 	if (meh[0].groupid == $groupsStore[group].groupid) {
				// 		groupnameA = $groupsStore[group].groupname;
				// 	}
				// }
				// console.log("printing meh", meh)
			} catch (err) {
				console.log(err);
			}
		}

		// element.scrollHeight - Math.abs(element.scrollTop) === element.clientHeight

		return;
	};

	function check() {
		// console.log(typeof message);
		if (message.trim().length === 0) {
			return;
		} else {
			// console.log('camehere');
			submit();
		}
	}

	const submit = async () => {
		// console.log('this was clicked');
		try {
			const submit = await fetch(`https://strengthn.herokuapp.com/user/messages/${$groupidS}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					token: JSON.stringify($jwt)
				},
				body: JSON.stringify({
					message
				})
			});
			const predata = await submit;
			const data = await submit.json();

			// console.log("groupstore", $groupsStore)
			// console.log("messages", $messages)
		} catch (err) {
			try {
				const submit = await fetch(
					`https://strengthn.herokuapp.com/user/messages/${$messages[0].groupid.toString()}`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							token: JSON.stringify($jwt)
						},
						body: JSON.stringify({
							message
						})
					}
				);
				const predata = await submit;
				const data = await submit.json();

				// 	console.log("groupstore", $groupsStore)
				// console.log("messages", $messages)
			} catch (err) {
				console.log(err);
			}

			message = '';
			// scrollFunc();
		}

		message = '';
		// scrollFunc();
	};

	setInterval(realTime, 100);

	// console.log(groupname)
	// console.log($groupidS)
	// console.log($messages)
	// console.log("groupstore", $groupsStore);
	$: reactiveGroupsStore = $groupsStore;
	// $: console.log("R groupstore", reactiveGroupsStore);
	// $: console.log("typeof R groupstore", typeof reactiveGroupsStore);
	// $: console.log("typeof R groupstore", reactiveGroupsStore.length);
	// $: console.log("groupstore", $groupsStore);
</script>

<body in:fly={{ x: -5, duration: 500, delay: 500 }} out:fly={{ x: 5, duration: 500 }}>
	<div class="test">
		<Messagenav on:hamburger={squish} on:groupchat={replace} />
		<!-- {console.log("gs", $groupidS)} -->
		{#if $groupidS == undefined || $groupidS == '0' || groupnameA == undefined}
			<div class="noName" />
		{:else if reactiveGroupsStore != undefined || reactiveGroupsStore != null || reactiveGroupsStore != []}
			{#each reactiveGroupsStore as { groupid }, i}
				{#if groupid == $groupidS}
					<h1 class="title">{reactiveGroupsStore[i].groupname}</h1>
				{/if}
			{/each}
		{/if}
		<!-- <h1 class="title">Group {$groupidS}</h1> -->
		<div class="chatbox" id="chatbox" class:adjust={navOpen}>
			{#if meh[0] == 'User does not have access to this group'}
				<p />
			{:else}
				{#each meh as { created_at, groupid, message, sentby, userid }}
					{#if message == null}
						<p />
					{:else if userid == $userID}
						<div class="flexRight">
							<div class="wrapMyMessage">
								<p class="myMessage">{message}</p>
							</div>
						</div>
					{:else}
						<div class="flexLeft">
							<div class="wrapTheirMessage container">
								<div>
									<p class="name">{sentby}</p>
									<p class="theirMessage">{message}</p>
								</div>
							</div>
						</div>
					{/if}
				{/each}

				<div bind:this={dummy} class="sickofyou">
					<!-- <p>tryagainandgain</p> -->
				</div>
			{/if}
		</div>

		<form on:submit|preventDefault={check} class:adjust={navOpen}>
			<input placeholder="....." bind:value={message} />
			<button on:click|preventDefault={check}>Send</button>
		</form>
	</div>
</body>

<style>
	* {
		box-sizing: border-box;
	}

	.noName {
		height: 50px;
	}

	.title {
		font-family: 'Raleway', sans-serif;
		font-weight: 700;
		width: 50vw;
		padding: 5px;
		margin: 9px;
		margin-left: 18.5%;
	}

	.chatbox {
		background-color: #dbe6fd;
		background-color: rgb(219, 230, 253, 0.4);
		border-radius: 10px;
		height: 80vh;
		width: 76.9vw;
		padding: 10px;
		margin-left: 18.5%;
		margin-bottom: 1%;
		transition: 0.5s;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
	}

	.flexRight {
		display: flex;
		justify-content: flex-end;
	}
	.wrapMyMessage {
		display: flex;
		justify-content: flex-end;
		margin: 0px 11px 10px 11px;
		width: 48%;
	}

	.myMessage {
		justify-content: flex-end;
		background-color: #47597e;
		color: #ffffff;
		font-size: 13px;
		border-radius: 10px;
		padding: 11px;
		/* margin: 11px; */
	}

	.flexLeft {
		display: flex;
		justify-content: flex-start;
	}

	.wrapTheirMessage {
		display: flex;

		justify-content: flex-start;
		margin: 0px 11px 10px 11px;
		width: 48%;
	}

	.theirMessage {
		background-color: #ffffff;
		color: #000000;
		font-size: 13px;
		border-radius: 10px;
		padding: 11px;
		margin-left: 3px;
		margin-top: 0px;
		display: flex;
	}

	.name {
		color: #909498;
		font-size: 13px;
		margin-bottom: 9px;
	}

	form {
		height: 6vh;
		width: 76vw;
		margin-left: 18.5%;
		display: flex;
		transition: 0.5s;
	}

	form input {
		flex: 1;
		margin-right: 15px;
		border-color: DCDCDC;
		border-width: thin;
		outline: none;
		background-color: #ffffff;
		font-size: 12px;
		border-radius: 10px;
		padding: 11px;
	}

	form button {
		background: rgba(71, 89, 126, 0.48);
		color: #ffffff;
		border: 2px solid rgba(220, 220, 220, 0.25);
		border-radius: 5px;
		padding: 2px 35px;
	}

	.adjust {
		width: 64.5vw;
	}
</style>
