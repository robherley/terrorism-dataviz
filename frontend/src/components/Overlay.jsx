import React, { Component } from 'react';
import InputRange from 'react-input-range';

import Button from './Button';

class Overlay extends Component {
  state = {
    min: 1970,
    max: 2017,
    openMid: false
  };

  render() {
    const { min, max, openMid } = this.state;
    const { start, end, slice, onRangeUpdate, children } = this.props;
    return (
      <div className="overlay">
        <div className="top">
          <h1>Global Terrorist Attacks</h1>
          <h2>
            From {start}-{end} &middot; {slice.length.toLocaleString()} Attacks
          </h2>
          <Button onChange={e => this.setState({ openMid: e })} />
        </div>
        <div className={`mid${openMid ? '' : '-closed'}`}>
          <div className="inner">{children}</div>
        </div>
        <div className="bottom">
          <InputRange
            allowSameValues
            maxValue={2017}
            minValue={1970}
            step={1}
            value={{ min, max }}
            onChange={({ min, max }) => this.setState({ min, max })}
            onChangeComplete={() => onRangeUpdate && onRangeUpdate(min, max)}
          />
        </div>
      </div>
    );
  }
}

export default Overlay;
