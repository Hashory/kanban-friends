<script>
  import { getIdToken } from "firebase/auth";
  import { userInfo } from "../firebase";
  import APIserverURl from "./apiserver";
  
  export const openModal = () => {
    dialog.showModal();
  }

  export let hand;

  let dialog;

  function deletee() {
    dialog.close();

    getIdToken(userInfo.user).then((idToken) => {
      fetch(`${APIserverURl()}hand/delete?userToken=${idToken}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: hand.id
      })
      }).then((res) => {
        if(res.status == 200) {
          hand = {};
        }
      })
    })
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={dialog} on:click={(e) => {e.target.tagName === "DIALOG" ? dialog.close(): ""}}>
  <section>
    <div class="title">本当に削除しますか？</div>
    <div class="buttons">
      <button class="cancel" on:click={() => dialog.close()}>キャンセル</button>
      <button class="delete" on:click={deletee}>削除</button>
    </div>
  </section>
</dialog>

<style>
  dialog {
    min-inline-size: 60%;
    border-radius: 1rem;
    border: none;
    padding: 0;
    backdrop-filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.5));
  }
  dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(0.5rem);
  }
  section {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding: 2rem;
  }

  .title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .buttons{
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    justify-content: end;
  }
  .buttons .delete {
    background-color: #e02929;
    color: white;
    border: 1px solid #686464;
    border-radius: 8px;
    padding: 0.5rem;
    cursor: pointer;
  }
  .buttons .cancel {
    background-color: transparent;
    color: #706464;
    border: 1px solid #686464;
    border-radius: 8px;
    padding: 0.5rem;
    cursor: pointer;
  }
</style>