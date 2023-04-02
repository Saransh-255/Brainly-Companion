export default async function showLoading(
  text: string, 
  id: string, 
  fn: () => Promise<void>, 
  elem?: Element
) {
  let target = elem ?? document.body;

  target.insertAdjacentHTML("beforeend", /*html*/`
  <div class="loading-ext sg-flex" id = "${id}">
    <div class="sg-spinner sg-spinner--white sg-spinner--xxsmall"> 
      <span class="sg-visually-hidden">loading</span> 
    </div>
    <div class = "sg-text sg-text--text-white sg-text--medium sg-text--bold">
      ${text}
    </div>
  </div>
  `);
  await fn();

  document.querySelector(".loading-ext#" + id).remove();
}