<script>
  import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  } from "@rgossiaux/svelte-headlessui";
    import { getIdToken } from "firebase/auth";
  import { PlusSolid } from "svelte-awesome-icons";
  import { userInfo } from "../firebase";
  import APIserverURl from "../lib/apiserver";

  export let userBoard;

  /**
   * Add a card to the board
   * @param type {"note"}
   */
  async function addCard(type) {
    console.log("addCard");
    try {
      // get parent id
      const parentId = userBoard.children[0].id;

      let data = {
        type: type,
        value: "",
        parent: parentId
      }

      // create fetch
      const idToken = await getIdToken(userInfo.user);
      const newCard = await fetch(`${APIserverURl()}hand/create?userToken=${idToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then((res) => {
        if(res.status == 200) {
          return res.json();
        }
        throw new Error("response status is not 200");
      })
      .then((data) => {
        return data;
      })

      // apply changes to userBoard
      const _userBoard = userBoard;
      _userBoard.children[0].children.push(newCard);
      userBoard = _userBoard;

    } catch {() => {console.log("error")}}
    
  }

  /**
   * Add a board to userBoard
   */
  async function addBoard() {
    console.log("addBoard");
    try {
      const parentId = userBoard.id;

      let data = {
        type: "board",
        value: "ボード",
        parent: parentId
      }

      // create fetch
      const idToken = await getIdToken(userInfo.user);
      const newBoard = await fetch(`${APIserverURl()}hand/create?userToken=${idToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then((res) => {
        if(res.status == 200) {
          return res.json();
        }
        throw new Error("response status is not 200");
      })
      .then((data) => {
        return data;
      })

      // apply changes to userBoard
      const _userBoard = userBoard;
      _userBoard.children.push(newBoard);
      userBoard = _userBoard;
    } catch {() => {console.log("error")}}
  }
</script>

<div>
<Menu>
  <MenuButton><PlusSolid ariaLabel="追加"/></MenuButton>
  <MenuItems>
    <MenuItem let:active>
      <button on:click={() => addCard("note")}>Note</button>
    </MenuItem>
    <MenuItem let:active>
      <button on:click={() => addBoard()}>board</button>
    </MenuItem>
    <MenuItem disabled>
      <button>RSS(開発中)</button>
    </MenuItem>
    <MenuItem disabled>
      <button>Epic games(開発中)</button>
    </MenuItem>
    <MenuItem disabled>
      <button>Discord(開発中)</button>
    </MenuItem>
    <MenuItem disabled>
      <button>Steam(開発中)</button>
    </MenuItem>
    <MenuItem disabled>
      <button>EA(開発中)</button>
    </MenuItem>
  </MenuItems>
</Menu>
</div>

<style>
  div :global(button) {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
</style>