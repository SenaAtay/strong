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

for (const group of groups) {
	const { members } = group;
	let groupText = '';
	for (const member of members) {
		groupText += member + ', ';
	}
	groupText = groupText.substring(0, groupText.length - 1);
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


// 


	
	const weeksInMonth = (year, month) => {
		let date = new Date(year, month);

		let days = [];
		while (date.getMonth() === month) {
			const startDate = date.toString();
			let endDate;
			if (date.getDay() != 1) {
				while (date.getMonth() === month && date.getDay() != 1) {
					endDate = date.toString();
					date.setDate(date.getDate() + 1);
				}
				days.push(startDate + '-' + endDate);
				continue;
			}
			let numDays = 6;
			while (numDays >= 0 && date.getMonth() === month) {
				endDate = date.toString();
				numDays--;
				date.setDate(date.getDate() + 1);
			}
			days.push(startDate + '-' + endDate);
		}
		return days;
	};

	const numDays = (weeks, index) => {
		const week = weeks[index];
		const arr = week.split('-');
		const start = new Date(arr[0]);
		const end = new Date(arr[1]);
		const diffTime = Math.abs(start - end);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		return diffDays;
	};

	const alertFunc = (path) => {
		goto(path);
	};

	let weeks = weeksInMonth(2021, 11);
</script>

<svelte:head>
	<title>Schedule</title>
</svelte:head>
<body in:fly={{ x: -5, duration: 500, delay: 500 }} out:fly={{ x: 5, duration: 500 }}>
	{#if schedules.length === 0}
		<h2>You have no meetings to schedule</h2>
	{:else}
		<section>
			<div>
				<h2>Start scheduling</h2>
				<div class="schedules-container">
					{#each schedules as { currentstep, groupid }, i}
						<div class="schedule-box" on:click={alertFunc(`/dash/schedules/${groupid}`)}>
							<div class={actionNeeded[i] ? 'yellow indicator' : 'green indicator'} />
							<div class="schedule-info-text">
								<h3>{actionNeeded[i] ? stepToName[currentstep] : 'Waiting for other members'}</h3>
								<p class="schedule-members">{groupMem[i]}</p>
							</div>
						</div>
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
	}
	.schedules-container {
		display: flex;
		flex-direction: column;
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
		background-color: yellow;
	}
	.green {
		background-color: green;
	}
	.schedule-members {
		color: grey;
	}
</style>
