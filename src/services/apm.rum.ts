import { init as initApm } from '@elastic/apm-rum';

export const apm = initApm({
  // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
  serviceName: 'Garage-Frontend',

  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: 'http://172.18.0.1:8200',

  // Set service version (required for sourcemap feature)
  serviceVersion: '1.0',
});
