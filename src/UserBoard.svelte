<script>
  import Board from "./Board.svelte";
  import APIserverURl from "./lib/apiserver";
  import dammyData from "./lib/dammyData";
  import { onMount } from "svelte";

  export let user;

  export let userBoard;
  onMount(() => {
    // dammy data
    userBoard = dammyData;
  });

  /**
   * @type {"loading" | "loaded" | "dammying"}
   */
  let status = "loading";
  function setData(data) {
    status = "loaded";
    userBoard = data;
  }

  $: {
    if(user !== undefined) {
      console.log("user is logged in");
      status = "loading";
      user.getIdToken().then((idToken) => {
        return fetch(`${APIserverURl()}hand?userToken=${idToken}`, {method: "GET",});
      }).then( res =>  res.json())
      .then( data => {
        console.log(data);
        setData(data);
      }).catch( error => {
        console.error(error);
        status = "dammying";
        user = undefined;
      })
    } else {
      console.log("user is not logged in");
      status = "dammying";
    }
  }

</script>

<div class="user-board">
  {#if status === "loading"}
    <div>loading...</div>
  {:else if (status === "loaded" || status === "dammying") && userBoard !== undefined }
    {#each userBoard.children as board}
      <Board bind:board />
    {/each}
  {/if}
</div>

<style>
  .user-board {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>