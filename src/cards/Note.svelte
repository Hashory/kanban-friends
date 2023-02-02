<script>
  import { NoteStickySolid ,PencilSolid, GripSolid, TrashCanSolid } from "svelte-awesome-icons";
  import CardValueEditing from "../lib/CardValueEditing.svelte";
  import CardDelete from "../lib/CardDelete.svelte";

  export let card;

  let openEditModal;
  let openDeleteModal;
</script>

<div class="card">
  <CardValueEditing id={card.id} bind:value={card.value} bind:openModal={openEditModal}/>
  <CardDelete bind:hand={card} bind:openModal={openDeleteModal}/>

  <div class="head">
    <div class="left">
      <NoteStickySolid size="16"/>
      <div class="title">Note</div>
    </div>
    <div class="buttons">
      <button class="delete" on:click={openDeleteModal}><TrashCanSolid size="15" /></button>
      <button class="edit" on:click={openEditModal}><PencilSolid size="15"/></button>
      <button class="move"><GripSolid size="15"/></button>
    </div>
  </div>
  
  <div class="content">{card.value}</div>

  <!-- <div class="debug">(id: {card.id})</div> -->
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

  .head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .title {
    font-size: 1.5rem;
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

</style>