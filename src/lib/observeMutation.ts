export default function observeMutation(data: {
    target: string | Element,
    hookInterval: number,
    itemFn: () => void,
    settings: {
      attributes: boolean,
      childList: boolean,
      subtree: boolean,
      characterData: boolean
    }
}) {
  const observer = new MutationObserver(data.itemFn);
  function addFunctionOnTarget() {
    let targetElem = (typeof data.target === "string") ? 
      document.querySelector(data.target) : data.target;
    if (!targetElem) return setTimeout(addFunctionOnTarget, data.hookInterval);
    
    observer.observe(targetElem, { 
      attributes: data.settings.attributes, 
      childList: data.settings.childList, 
      subtree: data.settings.subtree, 
      characterData: data.settings.characterData 
    });
    data.itemFn();
  }

  addFunctionOnTarget();
}