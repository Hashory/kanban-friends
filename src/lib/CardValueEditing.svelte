<script>
  import { getIdToken } from "firebase/auth";
  import { userInfo } from "../firebase";
  import APIserverURl from "./apiserver";

  export const openModal = () => {
    input_value = value;
    dialog.showModal();
  }

  export let id;
  export let value;

  let dialog;
  let input_value;

  function save() {
    let send_value = input_value;

    dialog.close();

    getIdToken(userInfo.user).then((idToken) => {
      fetch(`${APIserverURl()}hand/update?userToken=${idToken}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        value: send_value
      })
      }).then((res) => {
        if(res.status == 200) {
          value = send_value;
        }
      })
    })
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={dialog} on:click={(e) => {e.target.tagName === "DIALOG" ? dialog.close(): ""}}>
  <section>
    <div class="title">Edit</div>
    <input bind:value={input_value}>
    <div class="buttons">
      <button class="cancel" on:click={() => dialog.close()}>キャンセル</button>
      <button class="save" on:click={save}>変更</button>
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
    backdrop-filter: blur(1.5px);
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    padding: 2rem;
  }

  .title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  input {
    block-size: 100%;
    font-size: 1.5rem;
    padding: 0.5rem;
    border: 1px solid #686464;
    background-color: #0c2723;
    border-radius: 8px;
  }


  .buttons{
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    justify-content: end;
  }
  .buttons .save {
    background-color: #133e38;
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