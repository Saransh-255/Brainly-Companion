export default (pointsTxt:string) => {
  return /*html*/`
    <div role="button" class="pts-label">
      <div data-testid="points_counter" class="sg-counter sg-counter--xs sg-counter--red-60 sg-counter--with-icon">
        <div class="sg-flex sg-counter__icon-container">
          <div aria-hidden="false" class="sg-icon sg-icon--icon-black sg-icon--x24 sg-counter__icon">
            <svg class="sg-icon__svg" role="img" focusable="false"><use xlink:href="#icon-points" aria-hidden="true"></use></svg>
          </div>
        </div>
        <div class="sg-flex sg-flex--align-items-center">
          <span class="sg-text sg-text--small sg-text--bold sg-counter__text">
            <span class="sg-text sg-text--text-gray-60 sg-text--small sg-text--bold sg-text--no-wrap">
              <span class="sg-text sg-text--small sg-text--bold">${pointsTxt}</span> pts
            </span>
          </span>
        </div>
      </div>
    </div>`;
};