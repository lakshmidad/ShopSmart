// compare.js - placeholder for compare utilities
export function getCompare(){
  try{return JSON.parse(localStorage.getItem('compare'))||[]}catch(e){return []}
}
