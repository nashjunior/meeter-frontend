import { ZoomControlProps, ZoomControl as ZoomLeaflet } from 'react-leaflet';

export const ZoomControl: React.FC<ZoomControlProps> = props => (
  <ZoomLeaflet {...props} />
);
