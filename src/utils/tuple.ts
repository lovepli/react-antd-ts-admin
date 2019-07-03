// https://stackoverflow.com/questions/46176165/ways-to-get-string-literal-type-of-array-values-without-enum-overhead
const tupleStr = <T extends string[]>(...args: T) => args;

const tupleNum = <T extends number[]>(...args: T) => args;

export {
  tupleStr,
  tupleNum
}
