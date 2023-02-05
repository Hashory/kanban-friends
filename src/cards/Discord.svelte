<script>
  import { DiscordBrand ,PencilSolid, GripSolid, TrashCanSolid } from "svelte-awesome-icons";
  import CardValueEditing from "../lib/CardValueEditing.svelte";
  import CardDelete from "../lib/CardDelete.svelte";
  import APIserverURl from "../lib/apiserver";
  import { onMount } from "svelte";
  import Card from "./Card.svelte";


  export let card;
  export let cardIdx;
  export let boardIdx;

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

<Card bind:card={card} boardIdx={boardIdx} cardIdx={cardIdx}>
  <slot slot="heading">
    <DiscordBrand size="16"/>
    <div class="title">Discord</div>
  </slot>
  
  <slot slot="content" class="content">
    <div class="name">{card.value}</div>
    <div class="status">{status}</div>
  </slot>

</Card>

<style>
  .title {
    font-size: 1.5rem;
  }
  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 0.5rem;
  }
 .status::after {
    content: "";
    display: inline-block;
    block-size: 0.5rem;
    inline-size: 0.5rem;
    border-radius: 50%;
    background-color: lightgreen;
    margin-inline-start: 0.5rem;
  }
</style>