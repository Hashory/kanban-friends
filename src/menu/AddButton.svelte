<script>
  import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  } from "@rgossiaux/svelte-headlessui";
  import { PlusSolid } from "svelte-awesome-icons";
</script>

<div>
<Menu>
  <MenuButton><PlusSolid ariaLabel="追加"/></MenuButton>
  <MenuItems>
    <MenuItem let:active>
      <button>Note</button>
    </MenuItem>
    <MenuItem let:active>
      <button>board</button>
    </MenuItem>
    <MenuItem disabled>
      <button>RSS(開発中)</button>
    </MenuItem>
    <MenuItem disabled>
      <button>Epic games(開発中)</button>
    </MenuItem>
    <MenuItem disabled>
      <button>Discord(開発中)</button>
    </MenuItem>
    <MenuItem disabled>
      <button>Steam(開発中)</button>
    </MenuItem>
    <MenuItem disabled>
      <button>EA(開発中)</button>
    </MenuItem>
  </MenuItems>
</Menu>
</div>

<style>
  div :global(button) {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
</style>