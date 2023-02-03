<script>
  import { DiscordBrand ,PencilSolid, GripSolid, TrashCanSolid } from "svelte-awesome-icons";
  import CardValueEditing from "../lib/CardValueEditing.svelte";
  import CardDelete from "../lib/CardDelete.svelte";
  import APIserverURl from "../lib/apiserver";
  import { onMount } from "svelte";


  export let card;

let openEditModal;
let openDeleteModal;
/**
 * @type {"online" | "idle" | "dnd" | "offline" | "none"}
 */
let status = 'none';
let mounted = false;
onMount(() => {mounted = true;})

$: {
  if(mounted) {
    fetch(`${APIserverURl()}card/discord?discordUser=${card.value}`, {method: "GET",})
    .then(res => res.json())
    .then(data => {
        status = data.status;
    }).catch(error => {
        console.error(error);
        status = 'none';
    })
  }
}

</script>

<div class="card">
  <CardValueEditing id={card.id} bind:value={card.value} bind:openModal={openEditModal}/>
  <CardDelete bind:hand={card} bind:openModal={openDeleteModal}/>

  <div class="head">
    <div class="left">
      <DiscordBrand size="16"/>
      <div class="title">Discord</div>
    </div>
    <div class="buttons">
      <button class="delete" on:click={openDeleteModal}><TrashCanSolid size="15" /></button>
      <button class="edit" on:click={openEditModal}><PencilSolid size="15"/></button>
      <button class="move"><GripSolid size="15"/></button>
    </div>
  </div>
  
  <div class="content">
    <div class="name">{card.value}</div>
    <div class="status">{status}</div>
  </div>

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
    gap: 1px;
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

  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 0.5rem;
  }
  .content .status::after {
    content: "";
    display: inline-block;
    block-size: 0.5rem;
    inline-size: 0.5rem;
    border-radius: 50%;
    background-color: lightgreen;
    margin-inline-start: 0.5rem;
  }
</style>