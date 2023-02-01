<script>
  import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
  import { onMount } from "svelte";
  import { userInfo } from "./firebase";

  let dialog;
  let mounted = false;
  export let user = undefined;

  function login_google() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        user = result.user;
        userInfo.user = user;
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }

  onMount(() => {
    mounted = true;
  })

  
   $: {
    if(mounted) {
      let u = user;
      if(u === undefined) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    }
  }
  
</script>

<dialog bind:this={dialog} on:close={(e) => {user === undefined ? e.preventDefault() : ""}} on:cancel={(e) => {user === undefined ? /*e.preventDefault()*/"" : ""}}>
  <section>
    <h1>kanban-friends</h1>
    <button on:click={login_google} class="google">Google</button>
    <div>でログインして始める。</div>
  </section>
</dialog>

<style>
  dialog {
    padding: 1rem;
    background-color: white;
    color: black;
    border-radius: 1rem;
    border: none;
    min-inline-size: 60%;
    backdrop-filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.5));
  }
  dialog::backdrop {
    backdrop-filter: blur(4px) ;
    background-color: rgba(0, 0, 0, 0.35);
  }
  section {
    display: grid;
    justify-content: center;
    gap: 1rem;
  }

  h1 {
    text-align: center;
  }

  .google {
    background-color: #4285f4;
    font-size: 2rem;
    border: none;
    padding: 0.5rem;
    border-radius: 13px;
    color: white;
    cursor: pointer;
  }

  .google:hover {
    background-color: #3a7be0;
  }
  div {
    padding-block-end: 3em;
  }
</style>