// import { createSlice, PayloadAction } from 'redux-starter-kit';

// export type WeatherForLocation = {
//   description: string;
//   locationName: string;
//   temperatureinCelsius: number;
// };

// export type ApiErrorAction = {
//   error: string;
// };

// const initialState = {
//   temperatureinCelsius: 0,
//   temperatureinFahrenheit: 0,
//   description: '',
//   locationName: '',
// };

// const toF = (c: number) => (c * 9) / 5 + 32;

// const slice = createSlice({
//   name: 'weather',
//   initialState,
//   reducers: {
//     weatherDataRecevied: (state, action: PayloadAction<WeatherForLocation>) => {
//       const { description, locationName, temperatureinCelsius } = action.payload;
//       state.temperatureinCelsius = temperatureinCelsius;
//       state.temperatureinFahrenheit = toF(temperatureinCelsius);
//       state.description = description;
//       state.locationName = locationName;
//     },
//     weatherApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
//   },
// });

// export const reducer = slice.reducer;
// export const actions = slice.actions;

import * as actions from "../../store/actions";

const initialState = {
    temperatureinCelsius: null,
    temperatureinFahrenheit: null,
    description: "",
    locationName: ""
};

const toF = c => (c * 9) / 5 + 32;

const weatherDataRecevied = (state, action) => {
    const { getWeatherForLocation } = action;
    const {
        description,
        locationName,
        temperatureinCelsius
    } = getWeatherForLocation;

    return {
        temperatureinCelsius,
        temperatureinFahrenheit: toF(temperatureinCelsius),
        description,
        locationName
    };
};

const handlers = {
    [actions.WEATHER_DATA_RECEIVED]: weatherDataRecevied
};

export default (state = initialState, action) => {
    const handler = handlers[action.type];
    if (typeof handler === "undefined") return state;
    return handler(state, action);
};