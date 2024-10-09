export class QualityCheck {
  private readonly checkName: string;
  private readonly result: string;
  private readonly checkedBy: string;
  private readonly checkedAt: Date;

  constructor(checkName: string, result: string, checkedBy: string, checkedAt: Date = new Date()) {
    if (!checkName || checkName.trim().length === 0) {
      throw new Error("Check name cannot be empty");
    }
    if (!result || result.trim().length === 0) {
      throw new Error("Result cannot be empty");
    }
    if (!checkedBy || checkedBy.trim().length === 0) {
      throw new Error("Checked by cannot be empty");
    }

    this.checkName = checkName;
    this.result = result;
    this.checkedBy = checkedBy;
    this.checkedAt = checkedAt;
  }

  public getCheckName(): string {
    return this.checkName;
  }

  public getResult(): string {
    return this.result;
  }

  public getCheckedBy(): string {
    return this.checkedBy;
  }

  public getCheckedAt(): Date {
    return this.checkedAt;
  }
}
