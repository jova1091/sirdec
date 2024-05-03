<template>
  <div class="flex flex-col">
    <div
      class="mb-2 min-h-20 flex justify-center items-center text-center text-white bg-cover bg-center py-3 px-5 rounded-t-lg"
      style="background-image: url(/sirdec/img/bg_modulo.png)"
    >
      <p class="">Módulo de Cadáver</p>
    </div>
    <div class="flex-1">
      <ul
        id="modulo"
        v-if="$values"
        class="h-full text-center bg-cover bg-center py-10 px-8 rounded-b-lg"
        v-bind:style="{ 'background-image': 'url(' + $image + ')' }"
      >
        <li
          v-for="value in $values"
          v-bind:id="`mod_${value.id}`"
          v-bind:data-modulo="value.id"
          @click="[obtainLi(value.id)]"
          class="mb-2 py-2 rounded-xl border-2 text-white cursor-pointer hover:text-white transition-all delay-[0.25s] ease-out"
        >
          {{ value.nombre }}
        </li>
      </ul>
      <p v-else>No {{ $values }}</p>
    </div>
  </div>
</template>
<script setup>
import DataModulo from "../data/modulo.json";
import DataSubModulo from "../data/submodulo.json";
import { moduloId, addVariables, addSubModulo, addModulo, modulo, show, color } from "../store.js";
import { useStore } from "@nanostores/vue";

addModulo(DataModulo);
const $values = useStore(modulo);
const GENPATH = import.meta.env.BASE_URL;
const $image = GENPATH + "/img/bg_modulo.png";

function obtainLi(el) {
  show.set(false);
  let variables = [];
  let elem = document.getElementById("mod_" + el);
  const submoduloLis = document.querySelectorAll("#submodulo li");

  if (elem && elem.matches("li")) {
    let bgColor = getComputedStyle(elem).backgroundColor;
    let bck;
    if (bgColor.charAt(0) == "r") {
      let col = bgColor.replace("rgb(", "").replace(")", "").split(",");
      let r = parseInt(col[0], 10).toString(16);
      let g = parseInt(col[1], 10).toString(16);
      let b = parseInt(col[2], 10).toString(16);
      bck = "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
    }
    const ulmodulo = document.querySelectorAll("#modulo li");
    ulmodulo.forEach((element) => {
      element.classList.remove("active");
    });
    const liData = elem.getAttribute("data-modulo");
    elem.classList.add("active");
    moduloId.set(Number(liData));
    const submodulos = DataSubModulo.find(({ idmodulo }) => idmodulo === moduloId.get());
    show.set(true);
    addSubModulo(submodulos);
    addVariables(variables);
    color.set(bck);
  }
}
</script>

<style scoped>
li {
  position: relative;
}
li::before {
  visibility: hidden;
  content: " ";
  position: absolute;
  width: 150px;
  height: 3px;
  background: rgb(255, 218, 113);
  background: linear-gradient(90deg, rgba(255, 218, 113, 1) 0%, rgba(71, 196, 172, 1) 40%, rgba(87, 158, 229, 1) 100%);
  border-radius: 20px;
  right: 0px;
  top: calc(50% - 1.5px);
  transition: all 0.5s linear;
}

li:nth-child(1):hover {
  background: #ff8939;
  border-color: #ff8939;
}
li:nth-child(2):hover {
  background: #4472c4;
  border-color: #4472c4;
}
li:nth-child(3):hover {
  background: #6ba538;
  border-color: #6ba538;
}
li:nth-child(4):hover {
  background: #e29e05;
  border-color: #e29e05;
}
li:nth-child(5):hover {
  background: #868686;
  border-color: #868686;
}
li.active {
  color: #ffffff;
}
li.active:nth-child(1) {
  background: #ff8939;
  border-color: #ff8939;
}
li.active:nth-child(2) {
  background: #4472c4;
  border-color: #4472c4;
}
li.active:nth-child(3) {
  background: #6ba538;
  border-color: #6ba538;
}
li.active:nth-child(4) {
  background: #e29e05;
  border-color: #e29e05;
}
li.active:nth-child(5) {
  background: #868686;
  border-color: #868686;
}

li.active::before {
  visibility: visible;
  right: -147px;
}
</style>
