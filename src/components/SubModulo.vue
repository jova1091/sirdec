<template>
  <div class="flex flex-col">
    <div
      class="mb-2 min-h-20 flex justify-center items-center text-center text-white bg-cover bg-center py-3 px-5 rounded-t-lg"
      v-bind:style="{ 'background-image': 'url(' + $image + ')' }"
    >
      <p class="">Sub Módulo del SIRDEC a la que corresponde la información</p>
    </div>
    <Transition>
      <div v-if="$show" class="flex-1">
        <ul
          id="submodulo"
          v-if="Object.values($subModulo).length"
          class="h-full text-center bg-cover bg-center py-10 px-8 rounded-b-lg"
          v-bind:style="{ 'background-image': 'url(' + $image + ')' }"
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
      </div>
      <p v-else></p>
    </Transition>
  </div>
</template>

<script setup>
import { moduloId, subModulo, subModuloId, addVariables, show } from "../store";
import { useStore } from "@nanostores/vue";
import DataVariables from "../data/variable.json";

const $show = useStore(show);
const $subModulo = useStore(subModulo);
const GENPATH = import.meta.env.BASE_URL;
const $image = GENPATH + "/img/bg_submodulo.png";

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
    removeActiveLi();
    elem.classList.add("bg-[#214361]", "border-[#214361]", "active");
  }
}

function removeActiveLi() {
  const ulsubmodulo = document.querySelectorAll("#submodulo li");
  ulsubmodulo.forEach((element) => {
    element.classList.remove("bg-[#214361]", "border-[#214361]", "active");
  });
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
li {
  position: relative;
}
li::before {
  visibility: hidden;
  content: " ";
  position: absolute;
  width: 150px;
  height: 3px;
  background: rgb(71, 196, 172);
  background: linear-gradient(90deg, rgba(71, 196, 172, 1) 0%, rgba(87, 158, 229, 1) 100%);
  border-radius: 20px;
  right: 0px;
  top: calc(50% - 1.5px);
  transition: all 0.5s linear;
}
li.active::before {
  visibility: visible;
  right: -147px;
}
</style>
