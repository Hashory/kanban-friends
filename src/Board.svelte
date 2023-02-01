<script>
  import Note from "./cards/Note.svelte";
  import { PencilSolid, GripSolid } from "svelte-awesome-icons";
  import Discord from "./cards/Discord.svelte";
  import CardValueEditing from "./lib/CardValueEditing.svelte";

  export let board;

  let openModal;
</script>

<div class="board">
  <CardValueEditing id={board.id} bind:value={board.value} bind:openModal/>

  <div class="head">
    <div class="heading">{board.value}</div>
    <div class="buttons">
      <button class="edit" on:click={openModal}><PencilSolid /></button>
      <button class="move"><GripSolid /></button>
    </div>
  </div>
  <div class="content">
    {#each board.children as card}
      {#if card.type === "note"}
        <Note bind:card />
      {:else if card.type === "discord"}
        <Discord bind:card />
      {/if}
    {/each}
  </div>
</div>

<style>
  .board {
    display: flex;
    flex-direction: column;
    background-color: #132E3E;
    border: 2px solid #686464;
    border-radius: 36px;
    padding: 1rem;
    gap: 0.5rem;
  }

  .head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .heading {
    font-weight: bold;
    font-size: 2rem;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    flex-wrap: wrap;
    container-type: inline-size;
  }
  @media(min-width: 20rem) {
    .content {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media(min-width: 40rem) {
    .content {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

</style>
