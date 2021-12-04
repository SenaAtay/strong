<script lang="js">
	import { fade, slide, scale } from 'svelte/transition';

	import {
		Collapse,
		Navbar,
		NavbarToggler,
		NavbarBrand,
		Nav,
		NavItem,
		NavLink,
		Dropdown,
		DropdownToggle,
		DropdownMenu,
		DropdownItem,
		Button
	} from 'sveltestrap';
	let isOpen = false;
	function handleUpdate(event) {
		isOpen = event.detail.isOpen;
	}
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
	/>
</svelte:head>

<!-- svelte-ignore missing-declaration -->

<Navbar color="#FFFFFF" light expand="md">
	<NavbarBrand href="/"><img alt="logo" src="/blacklogo.png" /></NavbarBrand>
	<NavbarToggler on:click={() => (isOpen = !isOpen)} />
	<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
		<Nav class="ml-auto" navbar>
			<NavItem>
				<NavLink href="/admin">Administrator</NavLink>
			</NavItem>
			<NavItem>
				<Button class="login" href="pre/signin" style="background-color: black">Log in</Button>
			</NavItem>
			<!-- <Dropdown nav inNavbar>
        <DropdownToggle nav caret>Options</DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Reset</DropdownItem>
        </DropdownMenu>
      </Dropdown> -->
		</Nav>
	</Collapse>
</Navbar>

<style>
	img {
		width: 40px;
		margin: 20px 0px 0px 20px;
		cursor: pointer;
	}
</style>
