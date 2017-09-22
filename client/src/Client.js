const querystring = require('querystring');
const URL = '//52.91.10.230:8081/'
// const URL = ''

/* eslint-disable no-undef */
function search(query, cb) {
  
  const token = localStorage.getItem('token');
  const config = {
    accept: 'application/json',
    method: 'GET',
    headers: { 'x-access-token': token }
  }
  
  return fetch(`${URL}api/${query}`, config)
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function searchCriteria(path, criteria, cb) {
  
  const config = {
    accept: 'application/json',
    method: 'GET',
    headers: {
      'x-access-token': localStorage.getItem('token'),
    },
  }
  var query = querystring.stringify(criteria);
  
  return fetch(`${URL}api/${path}?${query}`, config)
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function post(path, data, cb) {
  
  const config = {
    accept: 'application/json',
    method: 'POST',
    headers: {
      'x-access-token': localStorage.getItem('token'), 
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }
  
  return fetch(`${URL}api/${path}`, config)
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function put(path, data, cb) {
  
  const config = {
    accept: 'application/json',
    method: 'PUT',
    headers: {
      'x-access-token': localStorage.getItem('token'), 
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }
  
  return fetch(`${URL}api/${path}`, config)
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function del(path, cb) {
  
  const config = {
    accept: 'application/json',
    method: 'DELETE',
    headers: {
      'x-access-token': localStorage.getItem('token'), 
      "Content-Type": "application/json"
    },
  }
  
  return fetch(`${URL}api/${path}`, config)
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function auth(config, cb) {
  return fetch(`${URL}api/auth`, config)
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(err => console.log(err));
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

const Client = { search, auth, post, put, del, searchCriteria };
export default Client;