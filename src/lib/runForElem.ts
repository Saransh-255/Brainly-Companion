export default function runForElem(
  selector: string,
  fn: (elem:HTMLElement) => void
) {
  const wait = () => {
    let elem = document.querySelector(selector) as HTMLElement;
    if (!elem) return setTimeout(wait, 1);
    fn(elem);
  };
  wait();
}