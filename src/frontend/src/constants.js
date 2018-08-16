let restApiUrl;
if(process.env.NODE_ENV==="production"){
  restApiUrl = "https://mydomain";
} else {
  restApiUrl = "http://localhost:3000";
}

export const REST_API_URL = restApiUrl;