const vals = 'ABCDEFG'.split('')

export const getNext = (list, current) => {
  const i = list.indexOf(current)
  const nextIndex = i === list.length - 1 ? 0 : i + 1
  return list[nextIndex]
}

export const getNextWithOctave = (note, octave) => {
  const nextNote = getNext(vals, note)
  const nextOctave = nextNote === 'A' ? octave + 1 : octave
  return [nextNote, nextOctave ]
}

export const getRange = (range) => {
  const [start, end] = range.split('')
  if (!vals.includes(start) || !vals.includes(end) || (start === end)) {
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

  let list = [`${start}${startOctave}`]
  let previous = [start, startOctave]
  do {
  const [prevNote, prevOctave] = previous
  const [note, octave] = getNextWithOctave(prevNote, prevOctave)
  list = list.concat(`${note}${octave}`)
  previous = [note, octave]
  } while (previous[0] !== end || previous[1] !== endOctave)

  return list
}
