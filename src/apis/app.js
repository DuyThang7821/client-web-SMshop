import axios from "../axios";

export const apiGetCategories = async () => {
    try {
      const response = await axios({
        url: '/prodCategory/',
        method: 'get',
      });
      return response;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };