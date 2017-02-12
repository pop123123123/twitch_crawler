import axios from 'axios';

//const data = require('./mock-data');
const API_URL = 'http://localhost:8888';
const LATENCY = 16;

export function getAllStreamers(cb) {
  axios.get(API_URL + '/streamers')
    .then(function(response) {
      cb(response.data);
    }).catch(function(error) {
      console.log(error);
    });
}

export function getStreamer(cb, id) {
  //axios.get(API_URL + '/streamers/' + id)
  axios.post(API_URL + '/streamers', {
      username: id
    })
    .then(function(response) {
      cb(response.data);
    }).catch(function(error) {
      console.log(error);
    });
  /*
    setTimeout(() => {
      let list = data.filter(function(obj) {
        return obj.name == id;
      });
      cb(list.length == 0 ? {} : list[0]);
    }, LATENCY);*/
}
