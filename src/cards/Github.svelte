<script>
  import { GithubBrand } from "svelte-awesome-icons";
  import APIserverURl from "../lib/apiserver";
  import { onMount } from "svelte";
  import Card from "./Card.svelte";


  export let card;
  export let cardIdx;
  export let boardIdx;

let status = 'none';
let mounted = false;
onMount(() => {mounted = true;})

$: {
  if(mounted) {
    fetch(`${APIserverURl()}card/github?githubUser=${card.value}`, {method: "GET",})
    .then(res => {
      if(res.status == 200) {
          return res.text();
      }
      throw new Error("response status is not 200");
    })
    .then(data => {
        status = data;
    }).catch(error => {
        console.error(error);
        status = 'none';
    })
  }
}

</script>

<Card bind:card={card} 
  boardIdx={boardIdx} 
  cardIdx={cardIdx} 
  editMessage="githubユーザー名を入力してください"
  editPlaceholder="username">
  <slot slot="heading">
    <GithubBrand size="16"/>
    <div class="title">github</div>
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
</style>