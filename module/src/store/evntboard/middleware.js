import { EvntCom } from 'evntcom-js';

import { actions } from "./";

let websocket;

const isDev = process.env.NODE_ENV === "development";

const getEmitterName = (store) => `react-starter:${store.getState()?.debug?.ws?.id}`

const middleware = (store) => (next) => (action) => {
  switch (action.type) {
    case actions.wsConnect.type:
      try {
        websocket = new EvntCom({
          port: isDev ? 5000 : window.location.port,
          host: isDev ? 'localhost' : window.location.hostname,
          events: ['*'],
        })

        websocket.on('open', (id) => {
          store.dispatch(actions.wsOnOpen(id))
        })

        websocket.on('close', (event) => {
          store.dispatch(actions.wsOnClose(event))
        })

        websocket.on('event', (event) => {
          store.dispatch(actions.wsNewEvent(event))
        })

        websocket.on('error', (event) => {
          store.dispatch(actions.wsOnError(event));
        })

        // simulate latency
        setTimeout(() => {
          websocket.connect()
        }, 5000)
      } catch (e) {
        store.dispatch(actions.wsOnError(e));
      }
      break;

    case actions.wsCreateEvent.type: {
      websocket.notify('newEvent', [action.payload.event, action.payload.payload, { emitter: getEmitterName(store) }]);
      break;
    }

    case actions.wsDisconnect.type:
      websocket.disconnect();
      break;

    default:
      // We don't really need the default but ...
      break;
  }

  return next(action);
};

export default middleware;
