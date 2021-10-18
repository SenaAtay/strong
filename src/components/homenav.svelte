<script lang="js">
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
    Button,
  } from "sveltestrap";
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
<Navbar color="white" light expand="md">
  <NavbarBrand href="/">StrengthN</NavbarBrand>
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav class="ml-auto" navbar>
      <NavItem>
        <NavLink href="#Administrator/">Administrator</NavLink>
      </NavItem>
      <NavItem>
        <Button class="login" href="pre/signin" >Log in</Button>
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