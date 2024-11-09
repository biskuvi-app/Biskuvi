export function RsOk<T>(o: any, message?: string): T {
  if (o == null || o == undefined) {
    try {
      throw Error("");
    } catch (err: any) {
      var caller_line = err.stack.split("\n")[4];
      var index = caller_line.indexOf("at ");
      var clean = caller_line.slice(index + 2, caller_line.length);
      message ??= "value is null/empty";
      throw ` ${clean}: ${typeof o}: ${message}`;
    }
  }
  return o;
}
