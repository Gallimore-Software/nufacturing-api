export class Guard {
  public static againstNullOrUndefinedBulk<T>(
    args: { argument: T | null | undefined; argumentName: string }[]
  ): { succeeded: boolean; message?: string } {
    for (const arg of args) {
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
