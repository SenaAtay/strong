<script>
	import { fade, slide, scale, fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { jwt } from '../../../stores/jwt';
	import { userID } from '../../../stores/userid';
	import { dash } from '../../../stores/dash';
	import { goto } from '$app/navigation';
	let schedules = [];
	let groups = [];
	let groupMem = [];
	let actionNeeded = [];
	let stepToName = {
		pw: 'Pick your week',
		vw: 'Vote for week',
		pd: 'Pick your dates and times',
		vd: 'Vote for dates and times',
		f: 'finished'
	};
	let userInfo;

	onMount(async () => {
		const unsubscribe = dash.subscribe((value) => {
			userInfo = value;
		});
		schedules = userInfo.schedules;

		groups = userInfo.groups;
		//
		for (const group of groups) {
			const { members } = group;
			let groupText = '';
			for (const member of members) {
				groupText += member + ', ';
			}
			groupText = groupText.substring(0, groupText.length - 2);
			groupMem.push(groupText);
		}
		for (const schedule of schedules) {
			const { finished } = schedule;
			let action = true;
			for (let i = 0; i < finished.length; i++) {
				const id = finished[i];
				if (id === $userID) {
					action = false;
					break;
				}
			}
			actionNeeded.push(action);
		}
	});

	const alertFunc = (path) => {
		goto(path);
	};
</script>

<svelte:head>
	<title>Schedule</title>
</svelte:head>
<body in:fly={{ x: -5, duration: 500, delay: 500 }} out:fly={{ x: 5, duration: 500 }}>
	{#if schedules.length === 0}
	<section>
		<div>
			<h1 style="font-family: 'Raleway', sans-serif; font-weight: 700;">Start scheduling</h1>
			</div>
			</section>
	{:else}
		<section>
			<div>
				<h1 style="font-family: 'Raleway', sans-serif; font-weight: 700;">Start scheduling</h1>
				<div class="schedules-container">
					{#each schedules as { currentstep, groupid }, i}
						{#if currentstep != 'f'}
							<div class="schedule-box" on:click={alertFunc(`/dash/schedules/${groupid}`)}>
								<div class={actionNeeded[i] ? 'yellow indicator' : 'green indicator'} />
								<div class="schedule-info-text">
									<h3 style="font-family: 'Raleway', sans-serif;">
										{actionNeeded[i] ? stepToName[currentstep] : 'Waiting for other members'}
									</h3>
									<p style="font-family: 'Raleway', sans-serif;" class="schedule-members">
										{groupMem[i]}
									</p>
								</div>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</section>
	{/if}
</body>

<style>
	* {
		margin: 0;
		padding: 0;
	}
	section {
		width: 700px;
		position: absolute;
		left: 250px;
		margin-top: 1%;
		margin-left: 2%;
		width: 70vw;
	}
	.schedules-container {
		display: flex;
		flex-direction: column;
		overflow-y: scroll;
		height: 90vh;
	}

	.schedule-box {
		display: flex;
		justify-content: flex-start;
		gap: 30px;
		padding: 25px;
		align-items: center;
		border-bottom: 1px solid grey;
	}
	.indicator {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		padding: 10px;
	}
	.yellow {
		background-color: #ffb951;
	}
	.green {
		background-color: #5eab99;
	}
	.schedule-members {
		color: grey;
	}
</style>
