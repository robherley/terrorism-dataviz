import React, { Component } from 'react';
import DeckGL, { ScatterplotLayer } from 'deck.gl';
import { StaticMap } from 'react-map-gl';

import storage from './utils/storage';
import filterTypes from './utils/filterTypes';

import Loader from './components/Loader';
import Overlay from './components/Overlay';
import Tooltip from './components/Tooltip';
import Radio from './components/Radio';
import Modal from './components/Modal';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class App extends Component {
  state = {
    data: null,
    start: 1970,
    end: 2017,
    slice: null,
    filterType: 'nkill',
    tooltip: {
      show: false,
      x: null,
      y: null,
      id: null
    },
    modal: {
      show: false,
      id: null
    }
  };

  INITIAL_VIEW_STATE = {
    longitude: 0,
    latitude: 10,
    zoom: 2,
    maxZoom: 10,
    minZoom: 1.5,
    pitch: 0,
    bearing: 0
  };

  componentDidMount = async () => {
    const data = await storage.getDots();
    this.setState({ data, slice: data });
  };

  triggerModal = id => {
    const {
      modal: { show }
    } = this.state;
    this.setState({ modal: { show: !show, id } });
  };

  fetchSlice = async (start, end) => {
    const { data } = this.state;
    const slice = data.filter(e => e.year >= start && e.year <= end);
    this.setState({ start, end, slice });
  };

  renderLayers = () => {
    const { slice, filterType } = this.state;
    this.scatterPlot = new ScatterplotLayer({
      data: slice,
      id: 'scatter-plot',
      opacity: 0.1,
      pickable: true,
      getRadius: 6e3,
      radiusMinPixels: 2,
      radiusMaxPixels: 6e3,
      getPosition: d => [d.longitude, d.latitude, d.nkill],
      getFillColor: d => filterTypes[filterType].colorBy(d),
      updateTriggers: {
        getFillColor: [filterType]
      },
      onHover: ({ object, x, y }) => {
        if (object)
          this.setState({
            tooltip: { show: true, x, y, id: object.eventid }
          });
        else this.setState({ tooltip: { show: false, x: null, y: null } });
      },
      onClick: ({ object }) => {
        this.triggerModal(object.eventid);
      }
    });
    return [this.scatterPlot];
  };

  render() {
    const { data, tooltip, filterType, start, end, slice, modal } = this.state;
    if (!data) return <Loader />;
    return (
      <>
        <Modal {...modal} onClose={() => this.triggerModal(null)} />
        <Tooltip {...tooltip} />
        <Overlay
          start={start}
          end={end}
          slice={slice}
          onRangeUpdate={this.fetchSlice}
        >
          <div className="section-head">Data Source</div>
          <p style={{ textAlign: 'justify' }}>
            The Global Terrorism Database (GTD) is an open-source database
            including information on terrorist events around the world from 1970
            through 2017. Unlike many other event databases, the GTD includes
            systematic data on domestic as well as international terrorist
            incidents that have occurred during this time period and now
            includes more than 180,000 cases.{' '}
            <a
              href="http://start.umd.edu/gtd"
              target="_blank"
              rel="noopener noreferrer"
            >
              More Information
            </a>
          </p>
          <div className="section-head">Color Data By</div>
          <Radio
            onChange={filterType => this.setState({ filterType })}
            value={filterType}
          />
          <div className="section-head">Legend</div>
          {filterTypes[filterType].legend}
        </Overlay>
        <DeckGL
          width="100%"
          height="100%"
          layers={this.renderLayers()}
          initialViewState={this.INITIAL_VIEW_STATE}
          controller
        >
          <StaticMap
            reuseMaps
            mapStyle="mapbox://styles/mapbox/dark-v9"
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />
        </DeckGL>
      </>
    );
  }
}

export default App;
