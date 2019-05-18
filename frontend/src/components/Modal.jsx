import React, { useState, useEffect } from 'react';

const tableFields = [
  ['Killed', 'nkill'],
  ['Wounded', 'nwound'],
  ['Type', 'attacktype1_txt'],
  ['Target', 'targtype1_txt'],
  ['Terrorist Group', 'gname']
];

const Modal = ({ id, onClose }) => {
  if (!id) return null;
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
      <div className="modal">
        <div className="inner">
          <button className="close" onClick={onClose}>
            &times;
          </button>
          <h2>
            {data.imonth}/{data.iday}/{data.iyear}
            <span>: {data.country_txt}</span>
          </h2>
          <div className="section-head">Summary</div>
          <p>{data.summary || 'No Summary Found'}</p>
          <div className="section-head">Statistics</div>
          <table>
            <tbody>
              {tableFields.map(([label, e]) => (
                <tr key={e}>
                  <td>{label}</td>
                  <td>{data[e] || 'Unknown'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
};

export default Modal;
