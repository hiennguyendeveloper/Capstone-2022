export function ENumToSelectPipe(definition: { [x: string]: any; }) {
  console.log(Object.values(definition))

  return Object.keys(definition)
    .map(key => ({value: definition[key], title: key}));
}
