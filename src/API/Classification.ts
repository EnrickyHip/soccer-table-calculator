import type { ClassificationInterface } from './types';

export default class Classification {
  private readonly classification: ClassificationInterface;

  constructor(classification: ClassificationInterface) {
    this.classification = classification;
  }

  isClassified(position: number, classification: keyof ClassificationInterface) {
    const classified = this.classification[classification];
    if (!classified) return false;
    return position >= classified.min && position <= classified.max;
  }

  get(position: number) {
    if (position === 1) return 'first';
    if (this.isClassified(position, 'classified1')) return 'classified1';
    if (this.isClassified(position, 'classified2')) return 'classified2';
    if (this.isClassified(position, 'classified3')) return 'classified3';
    if (this.isClassified(position, 'playoff')) return 'playoff';
    if (this.isClassified(position, 'relegated')) return 'relegated';
    return '';
  }
}
