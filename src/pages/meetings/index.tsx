import { Box, Button, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { withTransaction } from '@elastic/apm-rum-react';
import { NextPage } from 'next';
import { createRef, useCallback, useEffect, useRef, useState } from 'react';
import Leaflet, { LatLng, Map as MapLeaflet } from 'leaflet';
import { FaMapMarker, FaMapMarkerAlt, FaPlus, FaSearch } from 'react-icons/fa';
import ReactDOMServer from 'react-dom/server';
import { MdLocationPin } from 'react-icons/md';

import { PrivateLayout } from '../../components/layouts/Private';
import { Map, Marker, Popup, ZoomControl } from '../../components/Map';
import { ModalFormMeeting } from './components/_modal.form.meeting';
import { AsyncSelect, IOption } from '../../components/form';
import { apiMeeting } from '../../services/apiMeeting';
import { MeetingProvider } from '../../contexts';
import { ModalFormEditMeeting } from './components/_modal.form.meeting.edit';
import { useMeetingState } from '../../hooks';
import { IMeeting, IMeetingApiResponse } from '../../interfaces';

let L: Record<string, any> | undefined;

if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  L = require('leaflet');
}

const Meetings: NextPage = () => {
  const { updateMeetingState } = useMeetingState();
  const [position, setPosition] = useState<LatLng>();
  const {
    isOpen: isOpenModalFormMetting,
    onOpen: onOpenModalFormMetting,
    onClose: onCloseModalFormMetting,
  } = useDisclosure();

  const {
    isOpen: isOpenModalVisualizeMetting,
    onOpen: onOpenModalVisualizeMetting,
    onClose: onCloseModalVisualizeMetting,
  } = useDisclosure();

  const iconHTML = ReactDOMServer.renderToString(
    <MdLocationPin size={42} color="var(--chakra-colors-green-700)" />,
  );

  const a =
    typeof window !== 'undefined'
      ? L.divIcon({ html: iconHTML, className: '' } as Leaflet.DivIconOptions)
      : undefined;
  const [placeSelected, setPlaceSelected] = useState<IOption>();
  let mapRef = createRef<MapLeaflet | null>();
  // const mapRef = useRef<MapLeaflet | null>();
  const zoom = 12;
  const [points, setPoints] = useState<IMeeting[]>([]);
  const [lat, setLat] = useState<[number, number]>();
  const [long, setLong] = useState<[number, number]>();

  const loadMeetingsPoints = useCallback(async () => {
    const {
      data: { items },
      // eslint-disable-next-line object-curly-newline
    } = await apiMeeting.get<{ items: IMeetingApiResponse[] }>('meetings', {
      params: { lat, long },
    });

    setPoints(
      items.map(
        ({ lat: latResponse, long: longResponse, start, end, ...rest }) => ({
          ...rest,
          start: new Date(start),
          end: new Date(end),
          lat: Number.parseFloat(latResponse),
          long: Number.parseFloat(longResponse),
        }),
      ),
    );
  }, [lat, long]);
  useEffect(() => {
    if (mapRef.current) {
      L.DomEvent.disableClickPropagation(mapRef.current);
      const test = mapRef.current;
      const handleZoom = () => {
        setLong([test.getBounds().getWest(), test.getBounds().getEast()]);
        setLat([test.getBounds().getNorth(), test.getBounds().getSouth()]);
      };

      test.addEventListener('zoom', handleZoom);
      test.addEventListener('dragend', handleZoom);

      return () => {
        test.removeEventListener('zoom');
        test.removeEventListener('dragend');
      };
    }

    return undefined;
  }, [mapRef]);

  useEffect(() => {
    loadMeetingsPoints();
  }, [loadMeetingsPoints]);

  return (
    <>
      <SimpleGrid mb={4}>
        <AsyncSelect
          onChange={option => setPlaceSelected(option as IOption)}
          value={placeSelected}
          label="Search for events"
        />
      </SimpleGrid>
      <Map
        id="leaflet"
        center={[40.8054, -74.0241]}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: '80%', width: '100%' }}
        doubleClickZoom
        onLoadedMap={mapper => {
          mapRef = mapper;
        }}
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        <Marker
          position={position as LatLng}
          onClick={(e, _) => {
            // map2.flyTo(e.latlng, map2.getZoom());
            setPosition(e.latlng);
          }}
        >
          <Popup>
            <Button
              leftIcon={<FaPlus />}
              colorScheme="teal"
              onClick={onOpenModalFormMetting}
            >
              Add meeting on this place
            </Button>
          </Popup>

          {position && (
            <Box
              className="leaflet-bottom leaflet-left"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Box className="leaflet-control leaflet-bar" zIndex={2}>
                <Button
                  borderRadius="50%"
                  colorScheme="green"
                  size="md"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    onOpenModalFormMetting();
                  }}
                >
                  <FaPlus />
                </Button>
              </Box>
            </Box>
          )}
        </Marker>

        {points.map(point => (
          <Marker
            key={JSON.stringify(point)}
            position={[point.lat, point.long]}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClick={() => {}}
            icon={a}
          >
            <Popup>
              <Button
                leftIcon={<FaSearch />}
                colorScheme="teal"
                onClick={() => {
                  updateMeetingState(point);
                  onOpenModalVisualizeMetting();
                }}
              >
                {point.name}
              </Button>
            </Popup>
          </Marker>
        ))}
      </Map>
      <ModalFormMeeting
        isOpen={isOpenModalFormMetting}
        onClose={onCloseModalFormMetting}
        size="2xl"
        isCentered
        position={position}
      />

      <ModalFormEditMeeting
        isOpen={isOpenModalVisualizeMetting}
        onClose={onCloseModalVisualizeMetting}
        isCentered
        size="6xl"
      />
    </>
  );
};

Meetings.getLayout = function getLayout(page) {
  return (
    <PrivateLayout>
      <MeetingProvider>{page}</MeetingProvider>
    </PrivateLayout>
  );
};

export default withTransaction('Meeting', 'Page Component')(Meetings);
