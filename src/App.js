import React, { Component } from 'react';
import './App.css';
import * as helper from './helper'

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
            <Child key={name} name={name} />
          )
        })
      }
    </div>
  )
}

const Treble = (props) => {
  const range = helper.getRangeWithOctaves('D4G5').reverse()
  console.log(range)
  return (
    <Staff treble range={range} />
  )
}

const Bass = (props) => {
  const range = helper.getRangeWithOctaves('D4G5').reverse()
  return (
    <Staff bass range={range} />
  )
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <Treble />
      </div>
    );
  }
}

export default App;
