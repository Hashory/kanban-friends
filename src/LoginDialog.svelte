<script>
  import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
  import { onMount } from "svelte";

  let dialog;
  let mounted = false;
  export let user = undefined;

  function login_email_password() {
    const email = "wakuwakusan@localhearteasy.com"
    const password = "fjdksajfiepjasf"

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        user = userCredential.user;
        dialog.close();
        console.log("signin");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        user = undefined;
        console.error(errorCode);
        console.error(errorMessage);
      });
  }

  function login_google() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        user = result.user;
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

<dialog bind:this={dialog} on:close={(e) => {user === undefined ? e.preventDefault() : ""}}>
  <button on:click={login_google}>Google</button>
  <button on:click={login_email_password}>Email & Password</button>
</dialog>