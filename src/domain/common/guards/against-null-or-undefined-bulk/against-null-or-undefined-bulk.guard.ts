export class Guard {
  public static againstNullOrUndefinedBulk(
    args: { argument: any; argumentName: string }[]
  ): { succeeded: boolean; message?: string } {
    for (let arg of args) {
      if (arg.argument === null || arg.argument === undefined) {
        return {
          succeeded: false,
          message: `${arg.argumentName} is null or undefined`,
        };
      }
    }
    return { succeeded: true };
  }
}
