import type { ClassificationInterface } from './types/types';

export default class Classification {
  private readonly classification: ClassificationInterface;

  constructor(classification: ClassificationInterface) {
    this.classification = classification;
  }

  isClassified1(index: number) {
    const { classified1 } = this.classification;
    if (!classified1) return false;
    return index >= classified1.min && index <= classified1.max;
  }

  isClassified2(index: number) {
    const { classified2 } = this.classification;
    if (!classified2) return false;
    return index >= classified2.min && index <= classified2.max;
  }

  isClassified3(index: number) {
    const { classified3 } = this.classification;
    if (!classified3) return false;
    return index >= classified3.min && index <= classified3.max;
  }

  onPlayoff(index: number) {
    const { playoff } = this.classification;
    if (!playoff) return false;
    return index >= playoff.min && index <= playoff.max;
  }

  isRelegated(index: number) {
    const { relegated } = this.classification;
    if (!relegated) return false;
    return index >= relegated;
  }
}
