import { Popup as PopupLeaflet, PopupProps } from 'react-leaflet';
import { forwardRef } from 'react';

const Popup2: React.ForwardRefRenderFunction<any, PopupProps> = (
  { children, position, ...rest },
  ref,
) => (
  <PopupLeaflet {...rest} position={position} ref={ref}>
    {children}
  </PopupLeaflet>
);
export const Popup = forwardRef(Popup2);
