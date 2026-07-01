import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavouriteState {
  favouriteEvents: any[];
}

const initialState: FavouriteState = {
  favouriteEvents: [],
};

const getEventUniqueId = (e: any) => {
  if (!e) return '';
  const baseId = e.event_id || e.id || '';
  return e.event_date_id ? `${baseId}-${e.event_date_id}` : String(baseId);
};

const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    toggleFavourite: (state, action: PayloadAction<any>) => {
      const event = action.payload;
      const eventId = getEventUniqueId(event);
      const index = state.favouriteEvents.findIndex(
        (item) => getEventUniqueId(item) === eventId
      );
      if (index >= 0) {
        state.favouriteEvents.splice(index, 1);
      } else {
        state.favouriteEvents.push(event);
      }
    },
    hydrateFavourites: (state, action: PayloadAction<any[]>) => {
      state.favouriteEvents = action.payload || [];
    },
  },
});

export const { toggleFavourite, hydrateFavourites } = favouriteSlice.actions;
export default favouriteSlice.reducer;
