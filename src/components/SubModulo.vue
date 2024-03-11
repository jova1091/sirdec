<template>
  <div
    class="mb-2 min-h-20 flex justify-center items-center text-center text-white bg-cover bg-center py-3 px-5 rounded-t-lg"
    style="background-image: url(/img/bg_submodulo.png)"
  >
    <p class="">Sub Módulo del SIRDEC a la que corresponde la información</p>
  </div>
  <ul
    id="submodulo"
    v-if="Object.values($subModulo).length"
    class="h-3/4 text-center bg-cover bg-center py-10 px-8 rounded-b-lg"
    style="background-image: url(/img/bg_submodulo.png)"
  >
    <li
      ref="el"
      v-for="submodulo in Object.values($subModulo)"
      v-bind:data-subModulo="submodulo.id"
      @click="setSubModulo(submodulo.id)"
      v-bind:ref="submodulo.id"
      v-bind:class="{ active: isActive }"
      class="mb-2 py-2 rounded-xl border-2 text-white"
    >
      {{ submodulo.nombre }}
    </li>
  </ul>
  <p v-else></p>
</template>

<script setup>
import { moduloId, subModulo, subModuloId, addVariables } from "../store";
import { useStore } from "@nanostores/vue";
import DataVariables from "../data/variable.json";
import { ref, onMounted } from "vue";

const el = ref();
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
</script>
