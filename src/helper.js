const vals = 'ABCDEFG'.split('')

export const getNext = (list, current) => {
  const i = list.indexOf(current)
  const nextIndex = i === list.length - 1 ? 0 : i + 1
  return list[nextIndex]
}

export const getRange = (range) => {
  const [start, end] = range.split('')
  if (!vals.includes(start) || !vals.includes(end)) {
    throw new Error('invalid range')
  }
  let values = [start]
  let previous = start
  do {
    const next = getNext(vals, previous)
    values.push(next)
    previous = next
  } while (previous !== end)
  return values
}

export const getRangeWithOctaves = (range) => {
  const regex = (/([A-G])(\d)([A-G])(\d)/)
  const match = regex.exec(range)
  if (!match) {
    throw new Error('invalid range')
  }
  const [,start, startOctave, end, endOctave] = match
  if (startOctave > endOctave) {
    throw new Error('invalid range')
  }
  console.log(start, startOctave, end, endOctave)
}
