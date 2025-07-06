import axios from 'axios';
import { env } from '../env';

const client = axios.create({
  baseURL: env.WOOCOMMERCE_STORE_URL,
  auth: {
    username: env.WOOCOMMERCE_CONSUMER_KEY!,
    password: env.WOOCOMMERCE_CONSUMER_SECRET!
  }
});

export const fetchOrders = async (params = {}) => {
  return client.get('/wp-json/wc/v3/orders', {
    params: {
      per_page: 100,
      ...params
    }
  });
};

export const fetchProductById = async (id: number) => {
  return client.get(`/wp-json/wc/v3/products/${id}`);
};
