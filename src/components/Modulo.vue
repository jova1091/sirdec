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
          class="mb-2 py-2 rounded-xl border-2 text-white cursor-pointer hover:bg-yellow-300 hover:text-black hover:border-yellow-300 transition-all delay-[0.25s] ease-out"
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
import { moduloId, addSubModulo, addModulo, modulo } from "../store.js";
import { useStore } from "@nanostores/vue";

addModulo(DataModulo);
const $values = useStore(modulo);
const GENPATH = import.meta.env.BASE_URL;
const $image = GENPATH + "/img/bg_modulo.png";

function obtainLi(el) {
  let elem = document.getElementById("mod_" + el);
  if (elem && elem.matches("li")) {
    const ulmodulo = document.querySelectorAll("#modulo li");
    ulmodulo.forEach((element) => {
      element.classList.remove("bg-yellow-300", "text-black", "border-yellow-300");
      element.classList.add("text-white");
    });
    const liData = elem.getAttribute("data-modulo");
    elem.classList.add("bg-yellow-300", "text-black", "border-yellow-300");
    elem.classList.remove("text-white");
    moduloId.set(Number(liData));
    const submodulos = DataSubModulo.find(({ idmodulo }) => idmodulo === moduloId.get());
    addSubModulo(submodulos);
  }
}
</script>
