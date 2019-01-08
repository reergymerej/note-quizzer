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
  describe('getNext', () => {
    it('should return the next', () => {
      expect(helper.getNext([1, 2, 3, 4], 3)).toBe(4)
      expect(helper.getNext([1, 2, 3, 4], 4)).toBe(1)
    })
  })

  describe('getNextWithOctave', () => {
    it('should get next with octave', () => {
      expect(helper.getNextWithOctave('A', 4)).toEqual(['B', 4])
      expect(helper.getNextWithOctave('G', 4)).toEqual(['A', 5])
    })
  })

  describe('basic range', () => {
    it('should return a valid range', () => {
      expect(helper.getRange('AG')).toEqual('ABCDEFG'.split(''))
      expect(helper.getRange('BE')).toEqual('BCDE'.split(''))
      expect(helper.getRange('FB')).toEqual('FGAB'.split(''))
    })

    it('should handle invalid ranges', () => {
      expect(() => { helper.getRange('YO') }).toThrow('invalid range')
      expect(() => { helper.getRange('19') }).toThrow('invalid range')
      expect(() => { helper.getRange('C') }).toThrow('invalid range')
      expect(() => { helper.getRange('AA') }).toThrow('invalid range')
    })
  })

  describe('range with octaves', () => {
    it('should handle invalid ranges', () => {
      expect(() => { helper.getRangeWithOctaves('AG') }).toThrow('invalid range')
      expect(() => { helper.getRangeWithOctaves('A3G') }).toThrow('invalid range')
      expect(() => { helper.getRangeWithOctaves('G4A1') }).toThrow('invalid range')
    })

    it('should return a valid range', () => {
      expect(helper.getRangeWithOctaves('A4G4')).toEqual(['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4'])
      expect(helper.getRangeWithOctaves('A3G4')).toEqual(['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4'])
      expect(helper.getRangeWithOctaves('A4A5')).toEqual(['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'A5'])
      expect(helper.getRangeWithOctaves('D4G5')).toEqual(['D4', 'E4', 'F4', 'G4', 'A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5'])
    })
  })
})
