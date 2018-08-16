let restApiUrl;
if(process.env.NODE_ENV==="production"){
  restApiUrl = "https://mydomain"; //TODO
} else {
  restApiUrl = "http://localhost:4000";
}

export const REST_API_URL = restApiUrl;