<template>
  <div class="flex flex-col">
    <div
      class="mb-2 min-h-20 flex justify-center items-center text-center text-white bg-cover bg-center py-3 px-5 rounded-t-lg"
      style="background-image: url(/img/bg_variable.png)"
    >
      <p class="">Variable RUAFND</p>
    </div>
    <div
      v-if="Object.values($variables).length"
      class="h-full text-center bg-cover bg-center py-10 px-8 rounded-b-lg"
      style="background-image: url(/img/bg_variable.png)"
    >
      <div class="wrap-collabsible" v-for="capitulo in Object.values($variables)" v-bind:data-variable="capitulo">
        <input v-bind:id="capitulo.id" class="toggle" type="checkbox" />
        <label v-bind:for="capitulo.id" class="lbl-toggle">
          {{ capitulo.capitulo }}
        </label>
        <div class="collapsible-content">
          <div class="content-inner">
            <ul>
              <li
                v-for="variable in Object.values(capitulo.variables)"
                v-bind:data-variable="variable"
                class="border-b py-3 px-5 text-white text-left"
                v-html="variable"
              ></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <p v-else></p>
  </div>
</template>

<script setup>
import { variable } from "../store";
import { useStore } from "@nanostores/vue";

const $variables = useStore(variable);
</script>

<style scoped>
input[type="checkbox"] {
  display: none;
}
.wrap-collabsible {
  margin: 0 0 0.5rem 0;
}
.lbl-toggle {
  position: relative;
  display: block;
  text-align: center;
  padding: 0.5rem;
  background: transparent;
  cursor: pointer;
  border-radius: 0.75rem;
  transition: all 0.25s ease-out;
  border: 2px solid rgb(255 255 255);
  color: rgb(255 255 255);
}
.lbl-toggle:hover {
  color: #fff;
  background-color: #214361;
  border: 2px solid #214361;
}
.lbl-toggle::before {
  content: " ";
  position: absolute;
  top: calc(50% - 3px);
  right: 0.7rem;
  display: inline-block;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid currentColor;
  vertical-align: middle;
  transform: translateY(-2px);
  transition: transform 0.2s ease-out;
}
.toggle:checked + .lbl-toggle {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  background-color: #214361;
  border: 2px solid #214361;
  color: #fff;
}
.toggle:checked + .lbl-toggle::before {
  transform: rotate(90deg) translateX(-3px);
}
.collapsible-content {
  height: 0px;
  overflow: hidden;
  transition: max-height 0.25s ease-in-out;
}
.toggle:checked + .lbl-toggle + .collapsible-content {
  height: auto;
  overflow: auto;
}
.collapsible-content .content-inner {
  padding: 0;
}
.collapsible-content p {
  margin-bottom: 0;
}
.collapsible-content .item {
  margin: 15px 30px !important;
}
</style>
