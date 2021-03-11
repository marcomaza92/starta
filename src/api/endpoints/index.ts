import { baseUrl } from '../common';

const getOptions = {
  method: 'GET',
};

export const getItems = async (type) => {
  try {
    const response = await fetch(`${baseUrl}${type}`, getOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getItem = async (type, id) => {
  try {
    const response = await fetch(`${baseUrl}${type}/${id}`, getOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const paginateItems = async (type, page) => {
  try {
    const response = await fetch(
      `http://swapi.dev/api/${type}/?page=${page}`,
      getOptions
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const searchItems = async (type, value) => {
  try {
    const response = await fetch(
      `http://swapi.dev/api/${type}/?search=${value}`,
      getOptions
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
