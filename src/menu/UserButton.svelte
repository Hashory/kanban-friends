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
    <MenuItem disabled let:disabled>
      <button class:disabled>テーマ変更(開発中)</button>
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

  div :global(div[role="menu"]) {
    background-color: rgb(13, 39, 70);
    border: 1px solid #504f4f;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    padding: 8px 0;
    position: absolute;
    z-index: 10;
    display: grid;
    min-inline-size: 11rem;
  }

  div :global(div[role="menu"]) :global(button) {
    background-color: transparent;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    padding: 8px 16px;
    text-align: left;
    width: 100%;
  }
  div :global(div[role="menu"]) :global(button):hover {
    background-color: #0f4c8d;
  }

  div :global(div[role="menu"]) :global(button.disabled) {
    color: #a0a0a0;
    cursor: not-allowed;
  }
</style>