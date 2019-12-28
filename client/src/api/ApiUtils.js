import axios from 'axios';

export const ParseApiResponse = (success, response, options) => {
  const result = { success };

  if (!success) {
    // TODO: figure out if theres another path to handle here.
    result.errors = response.response.data.errors;
    return result;
  }

  const responseKeys = options.responseDataKeys || {};

  Object.keys(responseKeys).forEach(objKey => {
    const railsKey = responseKeys[objKey];
    result[objKey] = response.data[railsKey];
  });

  return result;
}

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