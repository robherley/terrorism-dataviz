import React from 'react';
import filterTypes from '../utils/filterTypes';

const Radio = ({ onChange, value }) => (
  <div className="radio-group">
    {Object.entries(filterTypes).map(([key, type]) => (
      <div key={key} className="pretty p-default p-round">
        <input
          type="radio"
          name={key}
          checked={value === key}
          onChange={() => onChange(key)}
        />
        <div className="state p-primary">
          <label>{type.label}</label>
        </div>
      </div>
    ))}
  </div>
);

export default Radio;
