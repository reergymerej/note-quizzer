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

export const getRangeWithOctaves = (requested) => {
  const regex = (/([A-G])(\d)([A-G])(\d)/)
  const match = regex.exec(requested)
  if (!match) {
    throw new Error('invalid range')
  }
  const [,start,, end] = match
  let [,, startOctave,, endOctave] = match
  startOctave = parseInt(startOctave, 10)
  endOctave = parseInt(endOctave, 10)

  if (startOctave > endOctave) {
    throw new Error('invalid range')
  }

  let ranges = []
  let currentOctave = startOctave
  do {
    const range = getRange(`${start}${end}`)
    ranges = ranges.concat(
      // add octaves
      range.map((x, i) => {
        const nextOctave = i > 0 && x === 'A'
        const octave = nextOctave ? currentOctave + 1 : currentOctave
        return `${x}${octave}`
      })
    )
    currentOctave++
  } while (
    start === end
      ? currentOctave < endOctave
      : currentOctave <= endOctave
  )

  return ranges.filter((x, i, all) => all.indexOf(x) === i)
}
