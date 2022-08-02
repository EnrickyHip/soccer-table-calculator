export const toggleClasses = <T1 extends string, T2 extends string>(element: HTMLElement, class1: T1, class2: T2) => {
  if (element.classList.contains(class1)) {
    element.classList.remove(class1);
    element.classList.add(class2);
    return class2;
  }
  element.classList.remove(class2);
  element.classList.add(class1);
  return class1;
};
