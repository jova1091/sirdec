<template>
  <div class="flex flex-col">
    <div
      class="mb-2 min-h-20 flex justify-center items-center text-center text-white bg-cover bg-center py-3 px-5 rounded-t-lg"
      style="background-image: url(/sirdec/img/bg_submodulo.png)"
    >
      <p class="">Sub Módulo del SIRDEC a la que corresponde la información</p>
    </div>
    <div class="flex-1">
      <ul
        id="submodulo"
        v-if="Object.values($subModulo).length"
        class="h-full text-center bg-cover bg-center py-10 px-8 rounded-b-lg"
        style="background-image: url(/sirdec/img/bg_submodulo.png)"
      >
        <li
          v-for="submodulo in $subModulo"
          v-bind:id="`sub_${submodulo.id}`"
          @click="[setSubModulo(submodulo.id), obtainLi(submodulo.id)]"
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

const $subModulo = useStore(subModulo);

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

function obtainLi(el) {
  let elem = document.getElementById("sub_" + el);
  if (elem && elem.matches("li")) {
    const ulsubmodulo = document.querySelectorAll("#submodulo li");
    ulsubmodulo.forEach((element) => {
      element.classList.remove("bg-[#214361]", "border-[#214361]");
    });
    elem.classList.add("bg-[#214361]", "border-[#214361]");
  }
}
</script>
