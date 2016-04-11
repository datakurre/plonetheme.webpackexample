import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, compose} from 'redux'
import Registry from 'pat-registry';

const YES = 'YES';
const NO = 'NO';
const ALIKE = 'ALIKE';
const SET_SHARING = 'SET_SHARING';
const SET_COMMERCIAL = 'SET_COMMERCIAL';

function deserialize(value) {
  return {
    'license': value.length ? value : 'by',
    'sharing':
      value.match('-nd') ? NO : value.match('-sa') ? ALIKE : YES,
    'commercial':
      value.match('-nc') ? NO : YES
  }
}

function serialize(state) {
  let license = 'by';
  switch (state.commercial) {
    case NO:
      license += '-nc';
  }
  switch (state.sharing) {
    case NO:
      license += '-nd';
      break;
    case ALIKE:
      license += '-sa';
  }
  return license;
}

function reducer(state={}, action) {
  switch (action.type) {
    case SET_SHARING:
      state = {
        sharing: action.value,
        commercial: state.commercial
      };
      break;
    case SET_COMMERCIAL:
      state = {
        sharing: state.sharing,
        commercial: action.value
      };
      break;
  }
  state.license = serialize(state);
  return state;
}

export default class LicenseSelector extends React.Component {
  render() {
    const license = this.props.license;
    const sharing = this.props.sharing;
    const commercial = this.props.commercial;
    const setSharing = this.props.setSharing;
    const setCommercial = this.props.setCommercial;
    return (
      <div>
        <p>
          Allow adaptations of your work to be shared?<br/>
          <input type="radio" id="license-sharing-yes"
                 name="license-sharing" value={YES}
                 checked={sharing === YES ? true : null}
                 onChange={(e) => e.target.checked ? setSharing(YES) : null} />
          <label htmlFor="license-sharing-yes">Yes</label>
          <input type="radio" id="license-sharing-no"
                 name="license-sharing" value={NO}
                 checked={sharing === NO ? true : null}
                 onChange={(e) => e.target.checked ? setSharing(NO) : null} />
          <label htmlFor="license-sharing-no">No</label>
          <input type="radio" id="license-sharing-alike"
                 name="license-sharing" value={ALIKE}
                 checked={sharing === ALIKE ? true : null}
                 onChange={(e) => e.target.checked ? setSharing(ALIKE) : null} />
          <label htmlFor="license-sharing-alike">Yes, as long as other share alike</label>
        </p>
        <p>
          Allow commercial uses of your work?<br/>
          <input type="radio" id="license-commercial-yes"
                 name="license-commercial" value={YES}
                 checked={commercial === YES ? true : null}
                 onChange={(e) => e.target.checked ? setCommercial(YES) : null} />
          <label htmlFor="license-commercial-yes">Yes</label>
          <input type="radio" id="license-commercial-no"
                 name="license-commercial" value={NO}
                 checked={commercial === NO ? true : null}
                 onChange={(e) => e.target.checked ? setCommercial(NO) : null} />
          <label htmlFor="license-commercial-no">No</label>
        </p>
        <p><img src={'https://i.creativecommons.org/l/' + license + '/4.0/88x31.png'}
                alt={license}/></p>
      </div>
    );
  }
}

LicenseSelector.propTypes = {
  license: React.PropTypes.string.isRequired,
  sharing: React.PropTypes.oneOf([YES, NO, ALIKE]),
  commercial: React.PropTypes.oneOf([YES, NO]),
  setSharing: React.PropTypes.func.isRequired,
  setCommercial: React.PropTypes.func.isRequired
};

Registry.register({
  name: 'license-selector',
  trigger: '.pat-license-selector',

  init ($el) {
    const el = $el.hide().get(0);

    // Initialize Redux Store from the input field value
    const store = module.hot  // Support Redux DevTools for Chrome in dev mode
      ? compose(window.devToolsExtension ? window.devToolsExtension() : f => f)
               (createStore)(reducer, deserialize($el.val()))
      : createStore(reducer, deserialize($el.val()));

    // Create container for the widget
    const container = document.createElement('div');
    el.parentNode.insertBefore(container, el);
    container.className = 'license-selector';

    // Render widget
    function render () {
      // Serialize value into input field
      $el.val(serialize(store.getState()));

      // (Re)render stateless widget
      ReactDOM.render((
        <LicenseSelector
          {...store.getState()}
          setSharing={(value) => store.dispatch({
            type: SET_SHARING,
            value: value
          })}
          setCommercial={(value) => store.dispatch({
            type: SET_COMMERCIAL,
            value: value
          })}
          />
      ), container);
    }

    // Subscribe re-render after each store change
    store.subscribe(render);

    // Initial rendering
    render();
  }
});
