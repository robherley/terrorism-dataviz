import * as localForage from 'localforage';

export default {
  init: () => {
    localForage.config({
      name: 'GlobalTerrorismDBCache'
    });
  },
  getDots: async () => {
    if (!(await localForage.getItem('dots'))) {
      try {
        const data = await fetch(`/slice?start=1970&end=2017`);
        const json = await data.json();
        await localForage.setItem('dots', json);
      } catch (e) {
        alert('UNABLE TO FETCH DATA');
      }
    }
    return localForage.getItem('dots');
  }
};
