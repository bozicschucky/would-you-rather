import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getUsers, _getQuestions, _saveQuestion } from "../data";

export const getAllUsers = createAsyncThunk(
  "users/getUsers",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await _getUsers();
      const data = response;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getQuestions = createAsyncThunk(
  "questions/getQuestions",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await _getQuestions();
      const data = response;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const saveQuestion = createAsyncThunk(
  "questions/saveQuestion",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await _saveQuestion(payload);
      const data = response;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    users: [],
    loggedInUser: {
      name: "",
      loggedIn: false,
    },
    questions: [],
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getQuestions.fulfilled, (state, action) => {
      state.questions = action.payload;
    });
    builder.addCase(saveQuestion.fulfilled, (state, action) => {
      const savedQuestion = action.payload;
      const id = savedQuestion.id;
      state.questions = { ...state.questions, [id]: savedQuestion };
    });
    builder.addCase("LOGIN", (state, action) => {
      state.loggedInUser.name = action.payload;
      state.loggedInUser.loggedIn = true;
    });
    builder.addCase("LOGOUT", (state, action) => {
      state.loggedInUser.name = "";
      state.loggedInUser.loggedIn = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
