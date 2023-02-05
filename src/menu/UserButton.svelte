<script>
  import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  } from "@rgossiaux/svelte-headlessui";
  import { getAuth, signOut } from "firebase/auth";
  import { UserSolid } from "svelte-awesome-icons";
  import { userStore } from "../lib/store";

  function logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      $userStore = undefined;
    }).catch((error) => {
      // An error happened.
    });
  }

</script>
<div>
<Menu>
  <MenuButton><UserSolid /></MenuButton>
  <MenuItems>
    <MenuItem disabled>
      <button>テーマ変更(開発中)</button>
    </MenuItem>
    <MenuItem let:active>
      <button on:click={logout}>ログアウト</button>
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