<script>
  import { PencilSolid, GripSolid, TrashCanSolid } from "svelte-awesome-icons";
  import Note from "./cards/Note.svelte";
  import Discord from "./cards/Discord.svelte";
  import Github from "./cards/Github.svelte";
  import CardValueEditing from "./lib/CardValueEditing.svelte";
  import CardDelete from "./lib/CardDelete.svelte";
  import { BoardDropHandler } from "./lib/DnDHelper";

  export let board;
  export let boardIdx;

  let openEditModal;
  let openDeleteModal;

  let dragOver = false;
</script>

<div class="board" 
  class:drag-over={dragOver}
  draggable="true" 
  data-tag="board"
  on:dragstart={(e) => {e.stopPropagation(); e.dataTransfer.setData("text", boardIdx)}}
  on:dragover={(e)=> e.preventDefault()}
  on:dragenter={() => {dragOver = true}} 
  on:dragleave={() => {dragOver = false}}
  on:drop={(e) => {BoardDropHandler(e, boardIdx)}}>
  <CardValueEditing id={board.id} bind:value={board.value} bind:openModal={openEditModal}/>
  <CardDelete bind:hand={board} bind:openModal={openDeleteModal}/>

  <div class="head">
    <div class="heading">{board.value}</div>
    <div class="buttons">
      <button class="delete" on:click={openDeleteModal}><TrashCanSolid /></button>
      <button class="edit" on:click={openEditModal}><PencilSolid /></button>
      <button class="move"><GripSolid /></button>
    </div>
  </div>
  <div class="content">
    {#each board.children as card, index}
      {#if card.type === "note"}
        <Note bind:card boardIdx={boardIdx} cardIdx={index}/>
      {:else if card.type === "discord"}
        <Discord bind:card boardIdx={boardIdx} cardIdx={index}/>
      {:else if card.type === "github"}
        <Github bind:card boardIdx={boardIdx} cardIdx={index}/>
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
  .board.drag-over{
    border: 3px dashed white;
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
