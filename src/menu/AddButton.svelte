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
  import { userBoardStore } from "../lib/store";
  /**
   * Add a card to the board
   * @param type {"note" | "discord"}
   */
  async function addCard(type) {
    console.log("addCard");
    try {
      // get parent id
      const parentId = $userBoardStore.children[0].id;

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
      const _userBoard = $userBoardStore;
      _userBoard.children[0].children.push(newCard);
      $userBoardStore = _userBoard;

    } catch {() => {console.log("error")}}
    
  }

  /**
   * Add a board to userBoard
   */
  async function addBoard() {
    console.log("addBoard");
    try {
      const parentId = $userBoardStore.id;

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
      const _userBoard = $userBoardStore;
      _userBoard.children.push(newBoard);
      $userBoardStore = _userBoard;
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
    <MenuItem>
      <button on:click={() => addCard("discord")}>Discord(beta)</button>
    </MenuItem>
    <MenuItem disabled>
      <button>RSS(開発中)</button>
    </MenuItem>
    <MenuItem disabled>
      <button>Epic games(開発中)</button>
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