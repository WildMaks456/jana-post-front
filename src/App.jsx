import { useMemo } from 'react';
import CustomMap from './components/CustomMap/CustomMap';
import { createNominatimProvider } from './components/CustomMap/geocodeProviders';

export default function App() {
  const geocoder = useMemo(() => createNominatimProvider({ language: 'ru' }), []);

  return (
    <CustomMap
      geocoder={geocoder}
      onAddressChange={(address) => {
        if (address) console.log('Выбран адрес:', address);
      }}
    />
  );
}
