import React, { Component } from 'react';
import './App.css';

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


const Staff = (props) => (
  <div className={`Staff ${ props.treble ? "TrebleCleff" : "BassCleff" }`}>
    {props.children}
  </div>
)

const Treble = () => {
  return (
  <Staff treble>
    <Space name="G5" />
    <Line name="F5" />
    <Space name="E5" />
    <Line name="D5" />
    <Space name="C5" />
    <Line name="B5" />
    <Space name="A5" />
    <Line name="G4" on />
    <Space name="F4" />
    <Line name="E4" />
    <Space name="D4" />
  </Staff>
)
}

const Bass = () => {
  return (
    <Staff bass>
      <Space name="B4" />
      <Line name="A4" />
      <Space name="" />
      <Line name="" />
      <Space name="" />
      <Line name="" />
      <Space name="" />
      <Line name="" on />
      <Space name="" />
      <Line name="" />
      <Space name="" />
    </Staff>
  )
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Treble />
        <Bass />
      </div>
    );
  }
}

export default App;
