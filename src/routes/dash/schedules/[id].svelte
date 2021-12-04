<script>
	import { onMount } from 'svelte';
	import { jwt } from '../../../stores/jwt';
	import { goto } from '$app/navigation';
	let schedule;
	let currentStep;
	let finished;
	let indexMonth;
	let dates;
	let weeks;
	let voteColors = [];
	let indexToMonth = {
		0: 'January',
		1: 'February',
		2: 'March',
		3: 'April',
		4: 'May',
		5: 'June',
		6: 'July',
		7: 'August',
		8: 'September',
		9: 'October',
		10: 'November',
		11: 'December'
	};
	let weekStr;

	const scheduleAction = async () => {
		let pathname = window.location.pathname;
		let arr = pathname.split('/');
		let id = parseInt(arr[arr.length - 1]);
		console.log(weeks, dates);
		try {
			if (!dates) {
				dates = [[]];
			}
			const result = await fetch(`https://strengthn.herokuapp.com/user/schedules/${id}`, {
				method: 'POST',
				body: JSON.stringify({
					weeks,
					dates
				}),
				headers: {
					'Content-Type': 'application/json',
					token: JSON.stringify($jwt)
				}
			});
			console.log(result);
			const res = await result.json();
			console.log(res);

			goto('/dash/schedules');
		} catch (err) {
			console.log(err);
		}
	};

	const createColors = (numMembers) => {
		let color = 'background-color: rgba(71, 89, 126, ';
		for (let i = 0; i < numMembers; i++) {
			const percentage = (i + 1) / numMembers;
			voteColors.push(color + percentage + ');');
		}
	};

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
				days.push(startDate + '?' + endDate);
				continue;
			}
			let numDays = 6;
			while (numDays >= 0 && date.getMonth() === month) {
				endDate = date.toString();
				numDays--;
				date.setDate(date.getDate() + 1);
			}
			days.push(startDate + '?' + endDate);
		}
		return days;
	};

	const pickWeek = (index) => {
		let week = document.querySelector(`[data-index='${index}']`);
		let active = week.getAttribute('data-active');
		if (active === 'false') {
			weeks[index] += 1;
			active = 'true';
			week.style.color = 'white';
			week.style.backgroundColor = '#47597e';
		} else {
			weeks[index] -= 1;
			week.style.color = '#47597e';
			week.style.backgroundColor = 'white';
			active = 'false';
		}

		week.setAttribute('data-active', active);
	};
	onMount(async () => {
		let pathname = window.location.pathname;
		let arr = pathname.split('/');
		let id = parseInt(arr[arr.length - 1]);
		const result = await fetch(`https://strengthn.herokuapp.com/user/schedules/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				token: JSON.stringify($jwt)
			}
		});
		const res = await result.json();
		schedule = res[0];
		currentStep = schedule.currentstep;
		finished = schedule.finished;
		indexMonth = schedule.indexmonth;
		weeks = schedule.weeks;
		dates = schedule.dates;
		createColors(schedule.nummembers);

		weekStr = weeksInMonth(2021, indexMonth);

		for (let i = 0; i < weekStr.length; i++) {
			let interval = weekStr[i];
			const arr = interval.split('?');
			const start = new Date(arr[0]);
			const end = new Date(arr[1]);
			const intervalStr =
				start.getUTCMonth() +
				1 +
				'/' +
				start.getUTCDate() +
				'-' +
				(end.getUTCMonth() + 1) +
				'/' +
				end.getUTCDate();
			weekStr[i] = intervalStr;
		}
	});
</script>

<section>
	{#if currentStep === 'pw'}
		<div class="widget">
			<div class="week-picker">
				<h3 class="month">{indexToMonth[indexMonth]}</h3>
				<div class="weeks">
					{#each weekStr as week, i}
						<div
							class="week"
							data-index={i}
							data-active="false"
							on:click={() => {
								pickWeek(i);
							}}
						>
							<p>{week}</p>
						</div>
					{/each}
				</div>
				<button
					on:click|preventDefault={() => {
						scheduleAction();
					}}>Lock</button
				>
			</div>
			<div class="week-voter">
				<h3>Vote</h3>
				<div class="vote-colors">
					{#each voteColors as color, i}
						<div style={voteColors[i]} class="tone" />
					{/each}
				</div>
				<div class="week-choices">
					{#each weeks as week, i}
						{#if week != 0}
							<div class="vwWeek" style={voteColors[week]}>
								<p>
									{weekStr[i]}
								</p>
							</div>
						{:else}
							<p />
						{/if}
					{/each}
				</div>
			</div>
		</div>
	{:else if currentStep === 'vw'}{:else if currentStep === 'pd'}{:else if currentStep === 'vd'}{:else}
		<h2>This group meeting has already been scheduled</h2>
	{/if}
</section>

<style>
	* {
		margin: 0;
		padding: 0;
	}
	section {
		position: absolute;
		left: 250px;
	}
	.month {
		text-align: center;
		font-weight: 400;
		margin-bottom: 20px;
	}
	.widget {
		display: flex;
		gap: 20px;
	}
	.week-picker {
		display: flex;
		flex-direction: column;
		width: 700px;
	}
	.weeks {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}
	.week {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: 40px 0;
		border: 1px solid #47597e;
	}
	.week-choices {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 400px;
		background-color: #47597e63;
		border-radius: 2%;
		min-height: 600px;
		gap: 5px;
	}
	.week-voter h3 {
		text-align: center;
	}
	.tone {
		width: 60px;
		height: 5px;
		border-radius: 30%;
		padding: 10px;
	}
	.vote-colors {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 20px;
	}

	[data-active='false'] {
		background-color: white;
		color: #47597e;
	}
	[data-active='3'] {
		background-color: #47597e;
		color: white;
	}
	.vwWeek {
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 2px;
		height: 100px;
		width: 90%;
	}
</style>
