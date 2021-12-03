<script>
	import { createEventDispatcher } from 'svelte';
    export let eGroupId;

	const dispatchOne = createEventDispatcher();
	function dispatchEdit() {
		dispatchOne('edit', {
            eGroupIdV:eGroupId
        }
        );
	}

	const dispatchTwo = createEventDispatcher();
	function dispatchX() {
		dispatchTwo('x' , {
            eGroupIdV:eGroupId
        });
	}

    const dispatchThree = createEventDispatcher();
	function dispatchC() {
		dispatchThree('c');
	}

	let editing = false;

	function edit() {
		editing = true;
		console.log('edite basiyorsun');
		let element = document.getElementById('edit');
		element.innerHTML = '';
		dispatchEdit();
	}

	function cancel() {
		editing = false;
		let element = document.getElementById('edit');
		element.innerHTML = `  <div class="dot" class:hide={editing}>.</div>
                                <div class="dot" class:hide={editing}>.</div>
                                <div class="dot" class:hide={editing}>.</div>`;
		dispatchX();
	}

	function submit() {
		// alert('submitted');
		dispatchC();
	}
</script>

<div class="container" id="container">
	<div class="edit" id="edit" on:click={edit}>
		<div class="dot">.</div>
		<div class="dot">.</div>
		<div class="dot">.</div>
	</div>
	<div class="editing">
		<div class="editFunc" class:reveal={editing} on:click|preventDefault={cancel}>X</div>
		<div class="editFunc" class:reveal={editing} on:click|preventDefault={submit}>C</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		margin-left: 90%;
		width: 15px;
		padding: 0px;
		font-size: 25px;
		cursor: pointer;

		/* margin: 0px; */
	}

	.edit {
		display: flex;
		color: #dcdcdc;
	}

	.editFunc {
		visibility: hidden;
	}

	.reveal {
		visibility: visible;
	}

	.editing {
		display: flex;
	}
</style>
