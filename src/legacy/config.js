
function environment() {
  if (process.env.NODE_ENV === 'development') {
    return {
      BASE_URL: 'http://localhost:4000',
      API_URL: 'http://35.164.141.147:9000',

    }
  }

  else if (process.env.NODE_ENV === 'production') {
    return {
      BASE_URL: '',
      API_URL: '',

    }
  }
}

const config = environment();

export default config
