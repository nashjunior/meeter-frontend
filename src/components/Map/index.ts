import dynamic from 'next/dynamic';

export const Map = dynamic(
  async () => import('./map').then(({ Map: Mapper }) => Mapper),
  { ssr: false },
);
export const Marker = dynamic(
  () => import('./marker').then(({ Marker: Mapper }) => Mapper),
  { ssr: false },
);
export const Popup = dynamic(
  () => import('./popup').then(({ Popup: Mapper }) => Mapper),
  { ssr: false },
);

export const ZoomControl = dynamic(
  () => import('./ZoomControl').then(({ ZoomControl: Zoom }) => Zoom),
  { ssr: false },
);
