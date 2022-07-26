import type { ClassificationInterface } from './types/types';

export default class Classification {
  private readonly classification: ClassificationInterface;

  constructor(classification: ClassificationInterface) {
    this.classification = classification;
  }

  isClassified1(position: number) {
    const { classified1 } = this.classification;
    if (!classified1) return false;
    return position >= classified1.min && position <= classified1.max;
  }

  isClassified2(position: number) {
    const { classified2 } = this.classification;
    if (!classified2) return false;
    return position >= classified2.min && position <= classified2.max;
  }

  isClassified3(position: number) {
    const { classified3 } = this.classification;
    if (!classified3) return false;
    return position >= classified3.min && position <= classified3.max;
  }

  onPlayoff(position: number) {
    const { playoff } = this.classification;
    if (!playoff) return false;
    return position >= playoff.min && position <= playoff.max;
  }

  isRelegated(position: number) {
    const { relegated } = this.classification;
    if (!relegated) return false;
    return position >= relegated;
  }
}
