import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { useState, useContext } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { CartContext } from "../context/CartContext";

type AddressSuggestionType = {
  description: string;
  terms: [object]
}

type PlacesAutocompleteType = {
  setSelected: any
}

const mapContainerStyle = {
  height: "400px",
  width: "800px"
}

const center = {
  lat: -22.970,
  lng: -43.181
}


export default function Places() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB6-12gPefH3TcN4_4Xd0od14lStd6YdHc" as string,
    libraries: ["places"],
    language: "pt-BR"
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="border-red-600 p-x-16 mb-16 flex flex-col items-center gap-5">
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
      </div>
      <GoogleMap
        id="searchbox-example"
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={selected !== null ? selected : center}
      >
        {selected && <MarkerF position={selected} />}
      </GoogleMap>
    </div>
  );
}

export const PlacesAutocomplete = ({ setSelected }: PlacesAutocompleteType) => {
  const { setDeliveryAddress } = useContext(CartContext)
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // Quando clicar fora da pesquisa, o campo é esvaziado
    clearSuggestions();
  });

  const handleInput = (e: any) => {
    setValue(e.target.value);
  };

  const handleSelect = (suggestion: AddressSuggestionType) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(suggestion.description, false);
    setDeliveryAddress(suggestion.terms)
    clearSuggestions();

    getGeocode({ address: suggestion.description }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      setSelected({ lat, lng })
    });
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion as any)} className="bg-slate-100 cursor-pointer z-50 mt-1 w-96">
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref}>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Digite o endereço"
        className="h-10 p-5 rounded-md w-96 bg-slate-100"
        type="text"
      />
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};