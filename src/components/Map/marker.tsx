import {
  Marker as MarkerLeaflet,
  MarkerProps,
  useMapEvent,
} from 'react-leaflet';
import { LeafletMouseEvent, Map } from 'leaflet';
import { forwardRef } from 'react';

type IProps = MarkerProps & {
  onClick: (event: LeafletMouseEvent, map: Map) => void;
};
const Marker2: React.ForwardRefRenderFunction<any, IProps> = (
  { children, onClick, position, ...rest },
  ref,
) => {
  const map = useMapEvent('click', e => {
    onClick(e, map);
  });
  return position ? (
    <MarkerLeaflet {...rest} position={position} ref={ref}>
      {children}
    </MarkerLeaflet>
  ) : null;
};
export const Marker = forwardRef(Marker2);
