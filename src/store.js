import { atom, map } from "nanostores";

export const moduloId = atom();
export const subModuloId = atom();

export const modulo = map({});
export const subModulo = map({});
export const variable = map({});

export function addModulo(modulos) {
  modulo.set(modulos);
}

export function addSubModulo(submodulos) {
  subModulo.set(submodulos.submodulos);
}

export function addVariables(variables) {
  variable.set(variables.variables);
}
