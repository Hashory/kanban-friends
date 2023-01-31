<script>
  import Board from "./Board.svelte";

  export let user;

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

  // let status = Promise.resolve(userBoard);

  // async function load(idToken) {
  //   const res = await fetch(`http://localhost:3000/v1/hand?userToken=${idToken}`, {method: "GET", mode: "no-cors",})
  //   userBoard = await res.json();
  // }

  // $: {
  //   if(user !== undefined) {
  //     console.log("user is logged in");
  //     user.getIdToken().then((idToken) => {
  //       status = load(idToken);      
  //     });
  //   } else {
  //     console.log("user is not logged in");
  //   }
  // }
</script>

<div class="user-board">
  <!--
  {#await status}
    <div>loading...</div>
  {:then _userBoard}
  -->
    {#each userBoard.children as board}
      <Board bind:board />
    {/each}
  <!--
  {:catch error}
    <div>読み込みに失敗しました</div>
  {/await}
  -->
</div>

<style>
  .user-board {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>