import axios from 'axios';
import config from "../config";
import Vue from 'vue'

const SERVER_URL = config.resourceServer;

const instance = axios.create({
    baseURL: SERVER_URL,
});

export default {
  async execute(method, resource, data, config) {
    const accessToken = await Vue.prototype.$auth.getAccessToken();

    return instance({
      method: method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      ...config
    })
  },
  async get(resource, data, config) {
    const accessToken = await Vue.prototype.$auth.getAccessToken();

    return instance({
      method: "GET",
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      ...config
    })
  },
  async post(resource, data, config) {
    const accessToken = await Vue.prototype.$auth.getAccessToken();

    return instance({
      method: "POST",
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      ...config
    })
  },
}
