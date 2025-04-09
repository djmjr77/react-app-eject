import React ,{ lazy, Suspense, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// lazy load all features JS when they are rendered.
const IncidentManagement = lazy(() => import(/* webpackChunkName: "incident" */ './features/IncidentManagement'));
const DetourManagement = lazy(() => import(/* webpackChunkName: "detour" */ './features/DetourManagement'));


// we can only creat the react root once the Features dom element is drawn on the screen
// these functions are called by a specific EvtManager event (createReactRoot) that contains
//   the page requested. In the Spot Console you need to use the PageManager.getReactPage function
//   in order for this to work.
// We will need to create one of these functions for each Feature/Module we build in react for the SpotConsole.
function createIncidentManagementRoot () {
  console.error("RUNNING CREATE INCIDENT MANAGEMENT ROOT");
  const imRoot = createRoot(document.getElementById('incidentManager') as HTMLElement);
  imRoot.render(
    <StrictMode>
      <Suspense fallback={<div>Incident Manager Loading...</div>}>
        <IncidentManagement />
      </Suspense>
    </StrictMode>
  );
}
function createDetourManagementRoot () {
  const dmRoot = createRoot(document.getElementById('detourManager') as HTMLElement);
  dmRoot.render(
    <StrictMode>
      <Suspense fallback={<div>Detour Manager Loading...</div>}>
        <DetourManagement />
      </Suspense>
    </StrictMode>
  );
}

function loadRoot (data: { page: String; }) {
  console.error('GOT EVTMANAGER EVENT', data?.page);
  switch (data?.page) {
    case 'incidentManagement':
      createIncidentManagementRoot();
      break;
    case 'detourManagement':
      createDetourManagementRoot();
      break;
    default:
      console.error("Unknown React Feature Requested");
      break;
  }
}

// We have to pre-pend "window" to EvtManager to keep the compiler from failing to build
//   this is only at this level of the react code, ESLint has overrides for specific clases in the
//   component level.
if (window.EvtManager) {
  initializeReactApp();
} else {
  // Log the EvtManager not found this should not happen as long as all react JS files are included
  //  at the bottom of the SpotConsole layout screen
  console.error('EvtManager not found yet. Waiting for evtManagerReady event...');
}
function initializeReactApp () {
  console.error('CREATING EVTMANAGER LISTENER', typeof window.EvtManager, typeof window.EvtManager.on)
  window.EvtManager.on('createReactRoot', loadRoot);
}