import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as helper from './helper'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('helpers', () => {
  it('should return a valid range', () => {
    expect(helper.getRange('AG')).toEqual('ABCDEFG'.split(''))
    expect(helper.getRange('BE')).toEqual('BCDE'.split(''))
    expect(helper.getRange('FB')).toEqual('FGAB'.split(''))
    expect(helper.getRange('AA')).toEqual('ABCDEFGA'.split(''))
  })

  it('should handle invalid ranges', () => {
    expect(() => { helper.getRange('YO') }).toThrow('invalid range')
    expect(() => { helper.getRange('19') }).toThrow('invalid range')
    expect(() => { helper.getRange('C') }).toThrow('invalid range')
  })

  describe('getNext', () => {
    it('should return the next', () => {
      expect(helper.getNext([1, 2, 3, 4], 3)).toBe(4)
      expect(helper.getNext([1, 2, 3, 4], 4)).toBe(1)
    })
  })
})
