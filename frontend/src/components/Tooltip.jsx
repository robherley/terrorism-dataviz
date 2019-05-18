import React, { useState, useEffect } from 'react';

const Tooltip = ({ show, x, y, id }) => {
  if (!id || !show) return null;

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/info/${id}`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [id]);

  return (
    data && (
      <div
        className="tooltip"
        style={{ top: `${y - 35}px`, left: `${x + 15}px` }}
      >
        <div className="date">
          {data.imonth}/{data.iday}/{data.iyear}
        </div>
        <div className="country">
          <span role="img" aria-label="globe">
            🌎
          </span>{' '}
          {data.country_txt}
        </div>
        <div className="latlong">
          ({(+data.latitude).toFixed(3)}°, {(+data.longitude).toFixed(3)}°)
        </div>
        <table>
          <tbody>
            {data.nkill ? (
              <tr>
                <td>Killed</td>
                <td>{(+data.nkill).toLocaleString()}</td>
              </tr>
            ) : null}
            {data.nwound ? (
              <tr>
                <td>Wounded</td>
                <td>{(+data.nwound).toLocaleString()}</td>
              </tr>
            ) : null}
            {data.attacktype1_txt ? (
              <tr>
                <td>Type</td>
                <td>{data.attacktype1_txt}</td>
              </tr>
            ) : null}
          </tbody>
        </table>
        <div className="info">(Click For More Info)</div>
      </div>
    )
  );
};

export default Tooltip;
