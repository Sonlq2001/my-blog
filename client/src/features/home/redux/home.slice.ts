import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { homeApi } from './../api/home.api';
import { PostItemType, PostHomeType } from 'features/new-post/new-post';
import { ParamsHomePost } from '../types/home.types';
import { TYPE_POST } from '../constants/home.constants';

export const getPostsHome = createAsyncThunk(
  `home/getPostsTrending`,
  async (params: ParamsHomePost) => {
    try {
      const res = await homeApi.getListPostHomeApi(params);
      return res.data;
    } catch (error) {}
  }
);

export const getPostsNewest = createAsyncThunk(
  `home/getPostNewest`,
  async () => {
    try {
      const res = await homeApi.getPostsNewestApi();
      return res.data;
    } catch (error) {}
  }
);

interface HomeSlice {
  // post trending
  postsTrending: PostHomeType | null;
  isLoadingPostsTrending: boolean;

  // post newest
  postsNewest: PostItemType[];
  isLoadingPostsNewest: boolean;

  // post styles
  postsStyle: PostHomeType | null;
}

const initialState: HomeSlice = {
  // post trending
  postsTrending: null,
  isLoadingPostsTrending: false,

  // post newest
  postsNewest: [],
  isLoadingPostsNewest: false,

  // post style
  postsStyle: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: {
    // post trending
    [getPostsHome.pending.type]: (state) => {
      state.isLoadingPostsTrending = true;
    },
    [getPostsHome.fulfilled.type]: (state, action) => {
      state.isLoadingPostsTrending = false;
      switch (action.payload.list.slug) {
        case TYPE_POST.LIFE:
          state.postsTrending = action.payload.list;
          break;
        case TYPE_POST.NATURE:
        case TYPE_POST.ANIMAL:
        case TYPE_POST.SPORT:
          state.postsStyle = action.payload.list;
          break;
        default:
          break;
      }
    },
    [getPostsHome.rejected.type]: (state) => {
      state.isLoadingPostsTrending = false;
    },

    // post newest
    [getPostsNewest.pending.type]: (state) => {
      state.isLoadingPostsNewest = true;
    },
    [getPostsNewest.fulfilled.type]: (state, action) => {
      state.isLoadingPostsNewest = false;
      state.postsNewest = action.payload.postsNewest;
    },
    [getPostsNewest.rejected.type]: (state) => {
      state.isLoadingPostsNewest = false;
    },
  },
});

export const homeReducer = homeSlice.reducer;
