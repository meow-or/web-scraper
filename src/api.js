const url = 'http://localhost:8000/results';

function getData (onSuccess, onFail) {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then(onSuccess)
    .catch(onFail);
}

export { getData }
