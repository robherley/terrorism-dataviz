const SQL = require('sql-template-strings');

module.exports = {
  slice: (start, end) => SQL`
    SELECT
      eventid,
      attacktype1_txt,
      targtype1_txt,
      CAST(latitude AS REAL) AS latitude,
      CAST(longitude AS REAL) AS longitude,
      CAST(nkill AS INT) AS nkill,
      CAST(iyear AS INT) AS year
    FROM
      attacks
    WHERE
      iyear >= ${+start} AND iyear <= ${+end}
  `,
  info: id => SQL`
    SELECT * FROM attacks WHERE eventid = ${id}
  `
};
