export function requestInterceptor(req, operation) {

  // Prepend `SSWS` for any Try It request using an API token
  if (req.headers['Authorization'] && req.headers['Authorization'].length == 42) {
    req.headers['Authorization'] = 'SSWS ' + req.headers['Authorization'];
  }

  return req;
}