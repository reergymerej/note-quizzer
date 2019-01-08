import React, { Component } from 'react';
import './App.css';
import * as helper from './helper'

const trebleRange = helper.getRangeWithOctaves('D4G5')
const bassRange = helper.getRangeWithOctaves('F2B4')

const Note = (props) => (
  <div className="Note">{props.name}</div>
)

const Label = (props) => (
  <div className={`Label${ props.offset ? ' offset' : ''}`}>{props.value}</div>
)

const Line = (props) => (
  <div className="Line">
    {props.on && <Note />}
    {props.showLabel && <Label value={props.name} />}
  </div>
)

const Space = (props) => (
  <div className="Space">
    {props.on && <Note />}
    {props.showLabel && <Label value={props.name} offset />}
  </div>
)

const Staff = (props) => {
  return (
    <div className={`Staff ${ props.treble ? "TrebleCleff" : "BassCleff" }`}>
      {
        props.range.map((name, i) => {
          const Child = i % 2 === 0 ? Space : Line
          const on = props.on.includes(name)
          const showLabel = props.labels === "all"
            || (props.labels === "on" && on)
          return (
            <Child
              key={name}
              name={name}
              on={on}
              showLabel={showLabel}
            />
          )
        })
      }
    </div>
  )
}

const Treble = (props) => {
  const range = [...trebleRange].reverse()
  return (
    <Staff treble range={range} on={props.on} labels={props.labels} />
  )
}

const Bass = (props) => {
  const range = [...bassRange].reverse()
  return (
    <Staff bass range={range} on={props.on} labels={props.labels} />
  )
}

const getRandomNotes = () => {
  return [helper.randFromList([].concat(trebleRange, bassRange))]
}

const Scoreboard = (props) => (
  <div className="Scoreboard">
    <div className="best">{props.best}</div>
    <div className="time">{props.time}</div>
    <div className="current">{props.points}</div>
  </div>
)

const answerIsCorrect = (value, on) => {
  return on.join().includes(value.toUpperCase())
}

class App extends Component {
  state = {
    on: [],
    labelMode: "none",
    input: "",
    disable: false,
    time: 0,
    points: 0,
    best: 0,
  }

  componentDidMount() {
    this.nextNote()
  }

  handleSelectChange = (event) => {
    this.setState({ labelMode: event.target.value })
  }

  handleNextClick = (event) => {
    this.nextNote()
  }

  nextNote = () => {
    this.setState({
      on: getRandomNotes(),
      input: '',
      disable: false,
    })

    if (this.input) {
      this.input.focus()
    }
  }

  handleInputChange = (event) => {
    const { value } = event.target
    const change = answerIsCorrect(value, this.state.on) ? 1 : -1

    this.answerTimer = setTimeout(() => {
      this.nextNote()
      this.setState(prevState => ({
        labelMode: 'off',
        points: prevState.points + change,
      })
      )

    }, 1000)

    this.setState({
      input: value,
      labelMode: "on",
      disable: true,
    })
  }

  handleStartClick = () => {
    this.setState({ time: 30, points: 0 })

    this.gameInterval = setInterval(() => {
      const time = this.state.time - 1
      this.setState({ time: time })
      if (!time) {
        clearTimeout(this.gameInterval)
        const best = Math.max(this.state.best, this.state.points)
        this.setState({ best })
      }
    }, 1000)
  }

  componentWillUnmount() {
    clearTimeout(this.answerTimer)
    clearTimeout(this.gameInterval)
  }

  render() {
    const running = this.state.time > 0
    return (
      <div className="App">
        <Scoreboard
          time={this.state.time}
          points={this.state.points}
          best={this.state.best}
        />
        <Treble on={this.state.on} labels={this.state.labelMode} />
        <Bass on={this.state.on} labels={this.state.labelMode} />

        <div className="Tools">
          { !running &&
            <select onChange={this.handleSelectChange} value={this.state.labelMode}>
              <option value="none">None</option>
              <option value="all">All</option>
              <option value="on">Current</option>
            </select>
          }

          { !running &&
            <button onClick={this.handleNextClick}>Next</button>
          }

          { !running &&
            <button onClick={this.handleStartClick}>Start</button>
          }

          { running &&
            <input
              className="input"
              onChange={this.handleInputChange}
              value={this.state.input}
              disabled={this.state.disable}
              autoFocus
              ref={(node) => this.input = node}
            />
          }
        </div>
      </div>
    )
  }
}

export default App;
