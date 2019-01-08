import React, { Component } from 'react';
import './App.css';
import * as helper from './helper'

const trebleRange = helper.getRangeWithOctaves('D4G5')
const bassRange = helper.getRangeWithOctaves('F2B4')

const Note = (props) => (
  <div className="Note" />
)

const Label = (props) => (
  <div className={`Label${ props.offset ? ' offset' : ''}`}>{props.value}</div>
)

const Line = (props) => (
  <div className="Line">
    {props.on && <Note />}
    <Label value={props.name} />
  </div>
)

const Space = (props) => (
  <div className="Space">
    {props.on && <Note />}
    <Label value={props.name} offset />
  </div>
)

const Staff = (props) => {
  return (
    <div className={`Staff ${ props.treble ? "TrebleCleff" : "BassCleff" }`}>
      {
        props.range.map((name, i) => {
          const Child = i % 2 === 0 ? Space : Line
          return (
            <Child
              key={name}
              name={name}
              on={props.on.includes(name)}
            />
          )
        })
      }
    </div>
  )
}

const Treble = (props) => {
  const range = trebleRange.reverse()
  return (
    <Staff treble range={range} on={props.on} />
  )
}

const Bass = (props) => {
  const range = bassRange.reverse()
  return (
    <Staff bass range={range} on={props.on} />
  )
}

const getRandomNotes = () => {
  return helper.randFromList([].concat(trebleRange, bassRange))
}

class App extends Component {
  state = {
    on: [],
  }

  componentDidMount() {
    this.setState({
      on: getRandomNotes(),
    })
  }

  render() {
    return (
      <div className="App">
        <Treble on={this.state.on} />
        <Bass on={this.state.on} />
      </div>
    );
  }
}

export default App;
