import axios from 'axios';

export const ParseApiResponse = (success, response, options) => {
  const result = { success };
  console.log(response);

  if (!success) {
    // TODO: figure out if theres another path to handle here.
    if (response.message)
      result.errors = [response.message];
    else
      result.errors = response.response.data.errors;
    return result;
  }

  const responseKeys = options.responseDataKeys || {};

  Object.keys(responseKeys).forEach(objKey => {
    const railsKey = responseKeys[objKey];

    if (response.data[railsKey])
      result[objKey] = response.data[railsKey];
    else
      result[objKey] = response.data;
  });

  return result;
}

export const Call = (method, url, data, options = {}, parseCallback = ParseApiResponse) => {
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