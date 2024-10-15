import { createSlice } from '@reduxjs/toolkit';

// TODO: сделать универсальным для игр и тестов

const initialState = {
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
    setTestSearch(state, action) {
      state.testSearch = action.payload;
    },

    setTestsSortValue(state, action) {
      state.testsSortValue = action.payload;
    },

    setSelectedTest(state, action) {
      state.selectedTest = action.payload;
    },

    setGameSearch(state, action) {
      state.gameSearch = action.payload;
    },

    setGamesSortValue(state, action) {
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
