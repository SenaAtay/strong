<script>
	import { onMount } from 'svelte';

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
	//const test = weeksInMonth(2021, 11);
	// console.log(test);
	// console.log(numDays(test, 0));

	// onMount(() => {
	// 	let text = '';
	// 	const test = weeksInMonth(2021, 11);

	// 	test.forEach(myFunction);

	// 	document.getElementById('demo').innerHTML = text;

	// 	function myFunction(item, index) {
	// 		text += index + ': ' + item + '<br>';
	// 	}
	// });

	let weeks = weeksInMonth(2021, 11);
</script>

<svelte:head>
	<title>Schedule</title>
</svelte:head>

<h1>Schedule</h1>

<!-- <div class="rectangle " /> -->

<!-- <div bind:this={container} /> -->
<p id="demo" />

<div class="flex-container">
	{#each weeks as week}
		<div class="child"><p>{week}</p></div>
	{/each}
</div>

<style>
	* {
		margin: 0;
		padding: 0;
	}

	.child {
		margin: 10px;
		padding: 20px;
		border: 1px solid #47597e;
		box-sizing: border-box;
		width: 943px;
		height: 137px;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.flex-container {
		position: relative;
		left: 400px;
		align-items: center;
		justify-content: center;
	}
</style>
