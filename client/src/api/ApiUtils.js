import axios from 'axios';

export const Call = (method, url, data, options = {}, parseCallback) => {
  return new Promise(resolve => {
    axios({
      method,
      url,
      data
    })
      .then(response => {
        resolve(parseCallback(true, response, options));
      })
      .catch(error => {
        resolve(parseCallback(false, error, options));
      });
  });
}