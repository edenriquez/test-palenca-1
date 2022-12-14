const responses = {
  errors: {
    invalid: "CREDENTIALS_INVALID",
    details: "Incorrect username or password",
  },
  hello: "<H1>Hello Palenca 🐔!</H1>",
  success: "SUCCESS",
};

const mockData = {
  platform: "uber",
  profile: {
    country: "mx",
    city_name: "Ciudad de Mexico",
    worker_id: "34dc0c89b16fd170eba320ab186d08ed",
    first_name: "Pierre",
    last_name: "Delarroqua",
    email: "pierre@palenca.com",
    phone_prefix: "+52",
    phone_number: "5576955981",
    rating: "4.8",
    lifetime_trips: 1254,
  },
};

module.exports = {
  responses,
  mockData,
};
