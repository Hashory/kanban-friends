<script>
  import { NoteStickySolid ,PencilSolid, GripSolid, TrashCanSolid } from "svelte-awesome-icons";
  import Card from "./Card.svelte";

  export let card;
  export let cardIdx;
  export let boardIdx;
</script>

<Card bind:card={card} boardIdx={boardIdx} cardIdx={cardIdx}>
  <slot slot="heading">
    <NoteStickySolid size="16"/>
    <div class="title">Note</div>
  </slot>
  <slot slot="content">
    {card.value}
  </slot>
</Card>

<style>
  .title {
    font-size: 1.5rem;
  }
</style>