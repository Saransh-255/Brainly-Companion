export function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
export function groupSimilar(array, property:string) {
  let groupedArr = [];
  array.forEach((item, index) => {
    let rem = array.splice(index, 1)[0];
    let lastVal = groupedArr.pop();

    if ((rem[property] == lastVal?.[0]?.[property])) {
      lastVal.push(rem);
      groupedArr.push(lastVal);
    } else if (rem[property] == lastVal?.[property]) {
      groupedArr.push([lastVal, rem]);
    } else {
      groupedArr.push(lastVal, rem);
    }
  });

  groupedArr.splice(0, 1);
  return groupedArr;
}
export function makeChunks(array, chunkSize:number) {
  let chunkedArr = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    let chunk = array.slice(i, i + chunkSize);
    chunkedArr.push(chunk);
  }
  return chunkedArr;
}

export function distinctIds(arr) {
  let ids = [... new Set(arr.map(x => x.model_id))];
  return ids.map(id => {
    return arr.filter((item) => {
      if (item.model_id === id) return item;
    });
  });
}