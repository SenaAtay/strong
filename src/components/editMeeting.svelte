<script>
	import { createEventDispatcher } from 'svelte';
    export let eGroupId;
	export let allowEdit;
	

	

	const dispatchOne = createEventDispatcher();
	function dispatchEdit() {
		dispatchOne('edit', {
            eGroupIdV:eGroupId,
			allowEditV: allowEdit
        }
        );
	}

	const dispatchTwo = createEventDispatcher();
	function dispatchX() {
		dispatchTwo('x' , {
            eGroupIdV:eGroupId,
			allowEditV: allowEdit
        });
	}

    const dispatchThree = createEventDispatcher();
	function dispatchC() {
		dispatchThree('c', {
			eGroupIdV:eGroupId});
	}

	let editing = false;

	function edit() {
		console.log("allow edit", allowEdit)
		if (allowEdit == true){
			console.log('edite basiyorsun');
		let editElement = document.getElementById(`${eGroupId}edit`);
		// editElement.style.visiblity = "hidden";
		editElement.innerHTML = '';
		editElement.style.visibility = 'hidden';
		let xElement = document.getElementById(`${eGroupId}x`);
		xElement.style.visibility = "visible"
		let cElement = document.getElementById(`${eGroupId}c`);
		cElement.style.visibility = "visible"
		console.log(`${eGroupId}edit`);
		dispatchEdit();
		allowEdit = false;

		} else {
			return
		}
		// console.log("EVENTUE", event.detail.eGroupId);
		// editing = true;
		
	}

	function cancel() {
		// editing = false;
		let editElement = document.getElementById(`${eGroupId}edit`);
		editElement.innerHTML = `  <div class="dot" class:hide={editing}>.</div>
                                <div class="dot" class:hide={editing}>.</div>
                                <div class="dot" class:hide={editing}>.</div>`;
		editElement.style.visibility = "visible";
		let xElement = document.getElementById(`${eGroupId}x`);
		xElement.style.visibility = "hidden"
		let cElement = document.getElementById(`${eGroupId}c`);
		cElement.style.visibility = "hidden"
		dispatchX();
	}

	function submit() {
		let editElement = document.getElementById(`${eGroupId}edit`);
		editElement.innerHTML = `  <div class="dot" class:hide={editing}>.</div>
                                <div class="dot" class:hide={editing}>.</div>
                                <div class="dot" class:hide={editing}>.</div>`;
		editElement.style.visibility = "visible";
		let xElement = document.getElementById(`${eGroupId}x`);
		xElement.style.visibility = "hidden"
		let cElement = document.getElementById(`${eGroupId}c`);
		cElement.style.visibility = "hidden"
		dispatchC();
	}
</script>

<div class="container" id="container">
	<div class="edit" id={`${eGroupId}edit`} style= "visibility: visibile;" on:click={edit}>
		<div class="dot">.</div>
		<div class="dot">.</div>
		<div class="dot">.</div>
	</div>
	<div class="editing">
		<div class="editFunc" style= "visibility: hidden;"  id={`${eGroupId}x`} on:click|preventDefault={cancel}>X</div>
		<div class="editFunc" style= "visibility: hidden;"  id={`${eGroupId}c`} on:click|preventDefault={submit}>C</div>
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

	/* .editFunc {
		visibility: hidden;
	} */

	/* .reveal {
		visibility: visible;
	} */

	.editing {
		display: flex;
	}
</style>
