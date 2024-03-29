import { AxiosResponse } from 'axios';

import api from 'api/api';
import { HomeEnumEndpoints } from './../constants/home.endpoints';
import { ParamsHomePost } from '../types/home.types';

const getListPostHomeApi = (params: ParamsHomePost): Promise<AxiosResponse> => {
  return api.get(HomeEnumEndpoints.GET_POSTS_HOME, { params });
};

const getPostsNewestApi = (): Promise<AxiosResponse> => {
  return api.get(HomeEnumEndpoints.GET_POST_NEWEST);
};

const getPostsVideoApi = (): Promise<AxiosResponse> => {
  return api.get(HomeEnumEndpoints.GET_POSTS_VIDEO);
};

const getPostsSlideApi = (params: ParamsHomePost): Promise<AxiosResponse> => {
  return api.get(HomeEnumEndpoints.GET_POSTS_SLIDE, { params });
};

export const homeApi = {
  getListPostHomeApi,
  getPostsNewestApi,
  getPostsVideoApi,
  getPostsSlideApi,
};
