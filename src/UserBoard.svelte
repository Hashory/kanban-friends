<script>
  import Board from "./Board.svelte";
  import APIserverURl from "./lib/apiserver";

  export let user;

  // dammy data
  let userBoard = 
  {
    id: 1,
    type: "user_board",
    value: "user_board",
    children: [
      {
        id:2,
        type: "board",
        value: "Friend info",
        children: [
          {
            id: 3,
            type: "note",
            value: "My friend's name is ...",
            children: [],
          },
          {
            id: 4,
            type: "discord",
            value: "friend#1234",
            children: [],
          },
        ]
      },
      {
        id:5,
        type: "board",
        value: "This is secondary board",
        children: [
          {
            id: 6,
            type: "note",
            value: "Super cool!",
            children: [],
          },
          {
            id: 7,
            type: "discord",
            value: "OOF#0003",
            children: [],
          },
          {
            id: 6,
            type: "note",
            value: "One more!!!",
            children: [],
          },
          {
            id: 7,
            type: "note",
            value: "One more Note!!!",
            children: [],
          },
        ]
      },
    ]
  };

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
  {:else if status === "loaded" || status === "dammying"}
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