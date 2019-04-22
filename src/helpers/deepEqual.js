export function deepEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false
  }
  for (const propName in obj1) {
    if (!obj2.hasOwnProperty(propName)) {
      return false
    }
    if (obj1[propName].valueOf() !== obj2[propName].valueOf()) {
      if (!deepEqual(obj1[propName], obj2[propName])) {
        return false
      }
    }
  }
  return true
}
