import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = async (currentPage, limit) => {
  try {
    const start = currentPage * limit;
    const response = await axios.get(
      `${API_URL}?_start=${start}&_limit=${limit}`
    );
    return {
      data: response.data,
      count: parseInt(response.headers['x-total-count']) 
    };
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
};

export const createPost = async (postData) => {
  const response = await axios.post(API_URL, postData);
  return response.data;
};

export const updatePost = async (id, postData) => {
  const response = await axios.put(`${API_URL}/${id}`, postData);
  return response.data;
};

export const deletePostAPI = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};




//address Data 


export const loadCities = async () => {
  try {
    const res = await axios.get("https://dummyjson.com/users", {
      params: {
        limit: 100,
        select: "address,company",
      },
    });

    const filter_list = res.data.users.map((user) => ({
      addressCity: user.address.city,
      companyCity: user.company.address.city,
    }));

    const personal = [...new Set(filter_list.map((u) => u.addressCity))].sort();
    const company = [...new Set(filter_list.map((u) => u.companyCity))].sort();

    return { personalCities: personal, companyCities: company };
  } catch (err) {
    console.error("Failed to load cities:", err);
    return { personalCities: [], companyCities: [] };
  }
};

export const fetchFilteredUsers = async (key, value) => {
  const filterUrl = "https://dummyjson.com/users/filter";
  const filterParams = { key, value, select: "id,firstName,age,address,company", start: 0, limit: 100 };
  console.log("Fetching with:", filterParams);
  try {
    const res = await axios.get(filterUrl, { params: filterParams });
    console.log("Received data length:", res.data.users.length);
    return res.data.users.map(u => ({
      id: u.id,
      name: u.firstName,
      age: u.age,
      addressCity: u.address.city,
      companyCity: u.company.address.city,
    }));
  } catch (err) {
    console.error(`Error fetching for ${key}=${value}:`, err);
    return [];
  }
};

export const fetchDefaultUsers = async () => {
  try {
    const res = await axios.get("https://dummyjson.com/users", {
      params: {
        limit: 100,
        select: "id,firstName,age,address,company",
      },
    });
    return res.data.users.map(u => ({
      id: u.id,
      name: u.firstName,
      age: u.age,
      addressCity: u.address.city,
      companyCity: u.company.address.city,
    }));
  } catch (err) {
    console.error("Error fetching default users:", err);
    return [];
  }
};