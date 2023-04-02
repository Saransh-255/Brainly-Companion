export default (data:{
  direction: "row" | "column",
  padding?: boolean,
  id: string,
  items: {
    id: string,
    text: string,
    value?: string
  }[],
  lookFor: {
    text: string,
    id: string
  },
  onChange?: () => void;
}) => {
  let radioGroup : HTMLDivElement = document.createElement("div");
  radioGroup.classList.add(
    "sg-radio-group__items", 
    `sg-radio-group__items--direction-${data.direction}`
  );

  data.items.forEach(item => {
    let radio = document.createElement("div");
    radio.classList.add(
      "sg-radio", 
      "sg-radio--dark",
      `sg-radio--with-label`, 
      data.padding ? `sg-radio--with-padding` : ""
    );
    radio.innerHTML = /*html*/`
    <div class="sg-radio__wrapper">
        <div class="sg-radio__element">
            <input class="sg-radio__input" type="radio" id= ${item[data.lookFor.id]} name=${data.id} value=${item?.value}>
            <span class="sg-radio__circle sg-radio__circle--with-animation" aria-hidden="true"></span>
        </div>
        <label for=${item[data.lookFor.id]} class = "sg-text sg-text--medium sg-text--bold sg-radio__label sg-radio__label--medium">
            ${item[data.lookFor.text]}
        </label>
    </div>
  `;
    radioGroup.appendChild(radio);
  });
  data.onChange ? radioGroup.onchange = data.onChange : {};
  
  return radioGroup;
};