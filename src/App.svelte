<script>
  import AddButton from "./menu/AddButton.svelte";
  import UserButton from "./menu/UserButton.svelte";
  import UserBoard from "./UserBoard.svelte";
  import LoginDialog from "./LoginDialog.svelte";
  import logo from "./assets/logo.png";

  let user;
</script>

<LoginDialog bind:user/>
<header>
  <img src={logo} alt="kanban-friends">
  <div class="menu">
    <AddButton />
    <UserButton />
  </div>
</header>
<main>
  <UserBoard />
</main>

<style>
  header {
    display: flex;
    flex-direction: row;
    position: sticky;
    block-size: 5rem;
    inline-size: 100%;
    max-inline-size: 55rem;
    margin-inline: auto;
    inset-block-start: 0;

    background-color: #1B272D;
    border-end-start-radius: 15px;
    border-end-end-radius: 15px;
    z-index: 100;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    justify-content: space-between;
    padding-inline: 15px;
  }
  header .menu {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
  }
  header img {
    aspect-ratio: 185/80;
  }

  main {
    max-inline-size: 50rem;
    margin-inline: auto;
    padding-block: 1rem;
  }
</style>
