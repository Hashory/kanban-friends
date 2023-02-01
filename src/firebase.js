import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCEuS0Eh6aIK7X_U3zxwNCvunrUwogo0fI",
  authDomain: "kanban-friends.firebaseapp.com",
  projectId: "kanban-friends",
  storageBucket: "kanban-friends.appspot.com",
  messagingSenderId: "781011783419",
  appId: "1:781011783419:web:e2cf7b0e85820ee738aa5e"
};

export default function init() {
  const app = initializeApp(firebaseConfig);
}

export class userInfo{
  static user = undefined;
}