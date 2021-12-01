<!-- <script>
    import {jwt} from "/src/stores/jwt.js";
    import Signout from "/src/components/signout.svelte"

// console.log("i'm consoling", JSON.stringify($jwt));


const submitForm = async () =>{
    try {
        const submit = await fetch("https://strengthn.herokuapp.com/user/home", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "token": JSON.stringify($jwt)
            },
        }); 

        const data = await submit.json();
        console.log(data)
        const storedData= JSON.parse(data);
        console.log(storedData)

        
    } catch (err){
        console.log(err)
    } 
};

// console.log("after", parsedData)

</script> 
 -->
<script>
	import { dash } from '../../stores/dash';

	import { loadDash } from '../../stores/dash';
	import { onMount } from 'svelte';

	onMount(async () => {
		loadDash();
	});
	let userInfo;
	const unsubscribe = dash.subscribe((value) => {
		userInfo = value;
	});
	// $: console.log(groups);
	$: groups = userInfo.groups;
	$: messages = userInfo.messages;
	$: org = userInfo.org;
	$: user = userInfo.user;
</script>

{#if user == undefined}
	<p>loading</p>
{:else}
	<h3 class="intro">Hi, {user[0].fname} {user[0].lname}</h3>
{/if}

{#if groups == undefined}
	<h1>You have no meetings scheduled</h1>
{:else}
	<h2 style="color:white">Meetings</h2>
	{#each groups as { starttime, endtime, groupname, loc, dati }}
		<!-- <div class="rectangle" /> -->
		{#if starttime == null}
			<p>Not Scheduled</p>
		{:else}
			<div class="cardHead">
				<div class="cardBody">
					<h3 class="meet">Upcoming Meetings</h3>

					<div class="box">
						<h3>{groupname}</h3>
						<div class="time">
							<div>
								<p>Start Time</p>
								<div>{starttime}</div>
							</div>

							<div>
								<p>End Time</p>
								<div>{endtime}</div>
							</div>
						</div>

						<p>where: {loc}</p>
					</div>
				</div>
			</div>
		{/if}
		<!-- <div class="cardHead">
			<div class="cardBody">
				<h3 class="meet">Upcoming Meetings</h3>

				<div class="box">
					<h3>{groupname}</h3>
					<div class="time">
						<div>
							<p>Start Time</p>
							<div>{starttime}</div>
						</div>

						<div>
							<p>End Time</p>
							<div>{endtime}</div>
						</div>
					</div>

					<p>where: {loc}</p>
				</div>
			</div>
		</div> -->
	{/each}
{/if}

<style>
	* {
		margin: 0;
	}
	.meet {
		position: absolute;
		width: 206px;
		height: 98px;
		left: 68px;
		top: 160px;

		font-style: normal;
		font-weight: 500;
		font-size: 40px;
		line-height: 123%;
		/* or 49px */

		color: #293b5f;
	}
	.time {
		display: flex;
		flex-direction: row;
		align-content: space-between;
		gap: 30px;
	}
	.cardHead {
		margin: 10px;
		padding: 20px;
		position: absolute;
		width: 1037px;
		height: 426px;
		left: 384px;
		top: 300px;

		background: #dbe6fd;
		border-radius: 20px;
	}

	.box {
		position: absolute;
		width: 335px;
		height: 335px;
		left: 280px;
		top: 47px;
		text-align: center;

		background: #ffffff;
		border: 1px solid #dbe6fd;

		border-radius: 20px;
	}

	.cardBody {
		color: black;
		display: inline;
		left: 5000px;
	}

	/* .rectangle {
		position: absolute;
		width: 339px;
		height: 1080px;
		left: -8px;
		top: 0px;

		background: #47597e;
		border: 1px solid #000000;
		box-sizing: border-box;
		border-radius: 5px;
		z-index: -1;
	} */

	.intro {
		color: white;
	}
</style>
