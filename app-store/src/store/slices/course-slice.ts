import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Course, ResponseCourses } from "../../types";
import { api } from "../../services/api";
import type { RootState } from "../index";

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<ResponseCourses>(
        "/courses?populate[product][populate][image]=*",
      );
      return data.data;
    } catch {
      return rejectWithValue("Não foi possível carregar os cursos.");
    }
  },
);

export const addCourseAsync = createAsyncThunk(
  "courses/addCourse",
  async (data: Partial<Course>, { rejectWithValue }) => {
    try {
      const response = await api.post("/courses", {
        data,
      });

      return response.data;
    } catch {
      return rejectWithValue("Não foi possível adicionar o curso.");
    }
  },
);

interface CoursesState {
  items: Course[];
  error: string | null;
}

const initialState: CoursesState = {
  items: [],
  error: null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,

  reducers: {
    clearCourses: (state) => {
      state.items = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCourses.pending, (state) => {
      state.error = null;
    });

    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.items = action.payload;
    });

    builder.addCase(fetchCourses.rejected, (state, action) => {
      state.items = [];
      state.error = action.payload as string;
    });

    builder.addCase(addCourseAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.items.push(action.payload);
      }
    });
  },
});

export const { clearCourses } = coursesSlice.actions;
export const selectCourses = (state: RootState) => state.course;
export default coursesSlice.reducer;
