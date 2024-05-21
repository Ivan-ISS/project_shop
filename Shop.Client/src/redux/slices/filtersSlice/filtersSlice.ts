import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilters } from '../../../types';

export interface IFiltersState {
    initialFilters: IFilters;
    appliedFilters: IFilters;
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        initialFilters: {
            productName: '',
            priceFrom: null,
            priceTo: null,
        },
        appliedFilters: {
            productName: '',
            priceFrom: null,
            priceTo: null,
        }
    } as IFiltersState,
    reducers: {
        applyFilters: (state, action: PayloadAction<IFilters>) => {
            state.appliedFilters = action.payload;
        },
        resetFilters: (state) => {
            state.appliedFilters = state.initialFilters;
        }
    }
});

export { filtersSlice };
export const { applyFilters, resetFilters } = filtersSlice.actions;