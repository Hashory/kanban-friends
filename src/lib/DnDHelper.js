import { userBoardStore } from "./store";
import { get } from 'svelte/store'
import APIserverURl from "./apiserver";
import { getIdToken } from "firebase/auth";
import { userInfo } from "../firebase";

export function BoardDropHandler(ev, targetIndex) {
  if(ev.target.dataset.tag === "board") {
    ev.stopPropagation();
    const dragIdx = Number(ev.dataTransfer.getData("text"));

    getIdToken(userInfo.user).then((idToken) => {
      fetch(`${APIserverURl()}hand/update?userToken=${idToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: get(userBoardStore).children[dragIdx].id,
          parentTo: get(userBoardStore).id,
          parentToPos: targetIndex,
        }),
      }).then((res) => {

        if (res.status === 200) {
          userBoardStore.update((state) => {
            state.children.splice(targetIndex, 0, state.children.splice(dragIdx, 1)[0]);
            return state;
          });
        }

      })
    })
  }
}

export function CardDropHandler(ev, targetIndex, targetBoardIndex) {
  if(ev.target.dataset.tag === "card") {
    ev.stopPropagation();
    const data = ev.dataTransfer.getData("text");
    const dragIdx = Number(data.split(",")[0]);
    const dragBoardIdx = Number(data.split(",")[1]);

    getIdToken(userInfo.user).then((idToken) => {

      fetch(`${APIserverURl()}hand/update?userToken=${idToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: get(userBoardStore).children[dragBoardIdx].children[dragIdx].id,
          parentTo: get(userBoardStore).children[targetBoardIndex].id,
          parentToPos: targetIndex,
        }),
      }).then((res) => {

        if (res.status === 200) {
          userBoardStore.update((state) => {
            console.log(state.children[dragBoardIdx].children[dragIdx])
            state.children[targetBoardIndex].children.splice(targetIndex, 0, state.children[dragBoardIdx].children[dragIdx]);
            state.children[dragBoardIdx].children.splice(dragIdx, 1);
            return state;
          });
        }

      })
    });
  }
}