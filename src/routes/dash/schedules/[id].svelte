<script>
	import { onMount } from 'svelte';
	import { jwt } from '../../../stores/jwt';
	let schedule;
	let currentStep;
	let finished;
	let indexMonth;
	let weeks;
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
		weekStr = weeksInMonth(2021, indexMonth);

		//console.log(weekStr);

		for (let i = 0; i < weekStr.length; i++) {
			let interval = weekStr[i];
			const arr = interval.split('?');
			const start = new Date(arr[0]);
			const end = new Date(arr[1]);
			console.log(start);
			console.log(end);
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

		console.log(weekStr);
	});
</script>

<section>
	{#if currentStep === 'pw'}
		<div class="widget">
			<div class="week-picker">
				<h3 class="month">{indexToMonth[indexMonth]}</h3>
				<div class="weeks">
					{#each weekStr as week}
						<div class="week"><p>{week}</p></div>
					{/each}
				</div>
			</div>
			<div class="week-voter">
				<h3>Vote</h3>
				<div class="vote-colors" />
				<div class="week-choices">
					{#each weeks as week, i}
						{#if week != 0}
							<div class="vwWeek">
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
	.week-picker {
		display: flex;
		flex-direction: column;
	}
	.weeks {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.week {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px 200px;
		border: 1px solid rgba(128, 128, 128, 0.678);
	}
	.week-choices {
		width: 500px;
		background-color: #47597e63;
		min-height: 600px;
	}
	.week-voter h3 {
		text-align: center;
	}
</style>
