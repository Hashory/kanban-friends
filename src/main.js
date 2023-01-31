import './app.css'
import App from './App.svelte'
import firebaseInit from './firebase'

firebaseInit();

const app = new App({
  target: document.getElementById('app'),
})

export default app
