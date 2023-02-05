<script>
  import { PencilSolid, GripSolid, TrashCanSolid } from "svelte-awesome-icons";
  import CardValueEditing from "../lib/CardValueEditing.svelte";
  import CardDelete from "../lib/CardDelete.svelte";
  import { CardDropHandler } from "../lib/DnDHelper";

  export let card;
  export let cardIdx;
  export let boardIdx;

  let openEditModal;
  let openDeleteModal;

  let dragOver = false;
</script>

<div class="card" 
  class:drag-over={dragOver}
  draggable="true" 
  data-tag="card"
  on:dragstart={(e) => {e.stopPropagation(); e.dataTransfer.setData("text", `${cardIdx},${boardIdx}`)}}
  on:dragover={(e)=> e.preventDefault()}
  on:dragenter={() => {dragOver = true}} 
  on:dragleave={() => {dragOver = false}}
  on:drop={(e) => {CardDropHandler(e, cardIdx, boardIdx)}}>
  <CardValueEditing id={card.id} bind:value={card.value} bind:openModal={openEditModal}/>
  <CardDelete bind:hand={card} bind:openModal={openDeleteModal}/>

  <div class="head">
    <div class="left">
      <slot name="heading">
        <span class="red">missing</span>
      </slot>
    </div>
    <div class="buttons">
      <button class="delete" on:click={openDeleteModal}><TrashCanSolid size="15" /></button>
      <button class="edit" on:click={openEditModal}><PencilSolid size="15"/></button>
      <button class="move"><GripSolid size="15"/></button>
    </div>
  </div>

  <div class="content">
    <slot name="content">
      <span class="red">missing</span>
    </slot>
  </div>
</div>

<style>
  .card {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    display: flex;
    flex-direction: column;
    background: rgba(20, 74, 104, 0.7);
    backdrop-filter: blur(2px);
    border-radius: 15px;
    padding: 1rem;
    inline-size: 100%;
  }
  .card.drag-over{
    border: 3px dashed white;
  }

  .head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .head .buttons {
    display: flex;
    flex-direction: row;
    gap: 0;
    align-items: center;
  }
  .head button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  .head .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }

  .red {
    color: red;
  }
</style>