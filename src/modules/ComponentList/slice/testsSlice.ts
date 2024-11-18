import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// TODO: сделать универсальным для игр и тестов

type initialStateType = {
  testSearch: string,
  gameSearch: string,
  gamesSortValue: string,
  testsSortValue: string,
  selectedTest: null | string,
}
const initialState:initialStateType = {
  testSearch: '',
  gameSearch: '',
  gamesSortValue: 'id',
  testsSortValue: 'id',
  selectedTest: null,
};

const testsSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    setTestSearch(state, action: PayloadAction<string>) {
      state.testSearch = action.payload;
    },

    setTestsSortValue(state, action: PayloadAction<string>) {
      state.testsSortValue = action.payload;
    },

    setSelectedTest(state, action:PayloadAction<string>) {
      state.selectedTest = action.payload;
    },

    setGameSearch(state, action:PayloadAction<string>) {
      state.gameSearch = action.payload;
    },

    setGamesSortValue(state, action:PayloadAction<string>) {
      state.gamesSortValue = action.payload;
    },
  },
});

const { actions, reducer } = testsSlice;

export const {
  setTestSearch,
  setTestsSortValue,
  setSelectedTest,
  setGameSearch,
  setGamesSortValue,
} = actions;
export default reducer;
