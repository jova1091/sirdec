<template>
  <div class="flex flex-col">
    <div
      class="mb-2 min-h-20 flex justify-center items-center text-center text-white bg-cover bg-center py-3 px-5 rounded-t-lg"
      style="background-image: url(/img/bg_submodulo.png)"
    >
      <p class="">Sub Módulo del SIRDEC a la que corresponde la información</p>
    </div>
    <div class="flex-1">
      <ul
        ref="el"
        id="submodulo"
        v-if="Object.values($subModulo).length"
        class="h-full text-center bg-cover bg-center py-10 px-8 rounded-b-lg"
        style="background-image: url(/img/bg_submodulo.png)"
      >
        <li
          v-for="submodulo in Object.values($subModulo)"
          @click="[setSubModulo(submodulo.id), obtainLi(el)]"
          v-bind:data-subModulo="submodulo.id"
          class="mb-2 py-2 rounded-xl border-2 text-white cursor-pointer hover:text-white hover:bg-[#214361] hover:border-[#214361] transition-all delay-[0.25s] ease-out"
        >
          {{ submodulo.nombre }}
        </li>
      </ul>
      <p v-else></p>
    </div>
  </div>
</template>

<script setup>
import { moduloId, subModulo, subModuloId, addVariables } from "../store";
import { useStore } from "@nanostores/vue";
import DataVariables from "../data/variable.json";
import { ref, onBeforeUpdate } from "vue";

const $subModulo = useStore(subModulo);
const el = ref();

function setSubModulo(idSubModulo) {
  subModuloId.set(idSubModulo);
  let filter = {
    idmodulo: moduloId.get(),
    idsubmodulo: subModuloId.get(),
  };

  const variables = DataVariables.filter((item) => {
    for (let key in filter) {
      if (item[key] === undefined || item[key] != filter[key]) return false;
    }
    return true;
  });

  addVariables(variables[0]);
}

onBeforeUpdate(() => {
  console.log(el);
  obtainLi(el);
});

function obtainLi(e) {
  if (e.target && e.target.matches("li")) {
    const ulsubmodulo = document.querySelectorAll("#submodulo li");
    ulsubmodulo.forEach((element) => {
      element.classList.remove("bg-yellow-300", "text-black", "border-yellow-300");
      element.classList.add("text-white");
    });
    e.target.classList.add("bg-yellow-300", "text-black", "border-yellow-300");
    e.target.classList.remove("text-white");
  }
}
</script>
