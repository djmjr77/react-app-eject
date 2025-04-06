import React ,{ lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';

const IncidentManagement = lazy(() => import(/* webpackChunkName: "incident" */ './features/IncidentManagement'));
const DetourManagement = lazy(() => import(/* webpackChunkName: "detour" */ './features/DetourManagement'));

const imRoot = ReactDOM.createRoot(document.getElementById('incidentManager') as HTMLElement);
imRoot.render(
  <React.StrictMode>
    <Suspense fallback={<div>Incident Manager Loading...</div>}>
      <IncidentManagement />
    </Suspense>
  </React.StrictMode>
);

const dmRoot = ReactDOM.createRoot(document.getElementById('detourManager') as HTMLElement);
dmRoot.render(
  <React.StrictMode>
    <Suspense fallback={<div>Incident Manager Loading...</div>}>
      <DetourManagement />
    </Suspense>
  </React.StrictMode>
);
