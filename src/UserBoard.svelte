<script>
  import Board from "./Board.svelte";
  import APIserverURl from "./lib/apiserver";
  import dammyData from "./lib/dammyData";
  import { onMount } from "svelte";
  import { userBoardStore } from "./lib/store";
  import { userStore } from "./lib/store";

  onMount(() => {
    // dammy data
    $userBoardStore = dammyData;
  });

  /**
   * @type {"loading" | "loaded" | "dammying"}
   */
  let status = "loading";
  function setData(data) {
    status = "loaded";
    $userBoardStore = data;
  }

  $: {
    if($userStore !== undefined) {
      console.log("user is logged in");
      status = "loading";
      $userStore.getIdToken().then((idToken) => {
        return fetch(`${APIserverURl()}hand?userToken=${idToken}`, {method: "GET",});
      }).then( res =>  res.json())
      .then( data => {
        console.log(data);
        setData(data);
      }).catch( error => {
        console.error(error);
        status = "dammying";
        $userStore = undefined;
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
  {:else if (status === "loaded" || status === "dammying") && $userBoardStore !== undefined }
    {#each $userBoardStore.children as board, index}
      {#if board.type === "board"}
        <Board bind:board boardIdx={index}/>
      {/if}
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