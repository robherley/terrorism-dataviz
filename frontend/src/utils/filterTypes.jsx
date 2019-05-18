import React from 'react';
import * as d3 from 'd3';

const victimScale = d3
  .scaleLog()
  .domain([1, 1600])
  .range([0, 1]);

const attackTypes = {
  'Armed Assault': '#8377D1',
  Assassination: '#BA3B46',
  'Bombing/Explosion': '#274690',
  'Facility/Infrastructure Attack': '#9CEC5B',
  Hijacking: '#17BEBB',
  'Hostage Taking (Barricade Incident)': '#DE8F6E',
  'Hostage Taking (Kidnapping)': '#FFBB1C',
  'Unarmed Assault': '#D4AFCD',
  Unknown: '#FFFFFF'
};

// const victimTypes = [
//   'Abortion Related',
//   'Airports & Aircraft',
//   'Business',
//   'Educational Institution',
//   'Food or Water Supply',
//   'Government (Diplomatic)',
//   'Government (General)',
//   'Journalists & Media',
//   'Maritime',
//   'Military',
//   'NGO',
//   'Other',
//   'Police',
//   'Private Citizens & Property',
//   'Religious Figures/Institutions',
//   'Telecommunication',
//   'Terrorists/Non-State Militia',
//   'Tourists',
//   'Transportation',
//   'Unknown',
//   'Utilities',
//   'Violent Political Party'
// ];

export default {
  nkill: {
    label: 'Victims Killed',
    legend: (
      <div className="legend-kill">
        <img src="/legend.png" alt="legend" />
      </div>
    ),
    colorBy: ({ nkill }) => {
      const kills = parseInt(nkill);
      const scaled = victimScale(kills ? kills : 1);
      const { r, g, b } = d3.color(d3.interpolateCool(scaled));
      return [r, g, b];
    }
  },
  attack: {
    label: 'Attack Method',
    legend: (
      <div className="legend-attack">
        {Object.keys(attackTypes).map(at => (
          <div key={at}>
            <span
              className="circle"
              style={{
                backgroundColor: attackTypes[at]
              }}
            />
            {at}
          </div>
        ))}
      </div>
    ),
    colorBy: ({ attacktype1_txt: at }) => {
      const { r, g, b } = d3.color(attackTypes[at]);
      return [r, g, b];
    }
  }
  // victim: {
  //   label: 'Victim Type',
  //   legend: (
  //     <div className="legend-victim">
  //       {victimTypes.map(e => (
  //         <div key={e}>{e}</div>
  //       ))}
  //     </div>
  //   ),
  //   colorBy: () => {
  //     return [255, 255, 255];
  //   }
  // }
};
