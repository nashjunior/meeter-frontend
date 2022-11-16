import { MapContainer, MapContainerProps, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { Map as MapLeaflet } from 'leaflet';
import { useEffect, useRef } from 'react';

type IProps = MapContainerProps & {
  onLoadedMap?: (map: React.RefObject<MapLeaflet>) => void;
};
export const Map: React.FC<IProps> = ({ children, onLoadedMap, ...rest }) => {
  const innerRef = useRef<MapLeaflet | null>(null);

  useEffect(() => {
    if (onLoadedMap) onLoadedMap(innerRef);
  }, [innerRef, onLoadedMap]);

  return (
    <MapContainer {...rest} ref={innerRef}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {children}
    </MapContainer>
  );
};
// export const Map = forwardRef(Map2);
