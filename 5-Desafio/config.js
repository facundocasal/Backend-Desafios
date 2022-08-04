import dotenv from "dotenv";
dotenv.config();

export default {
  firebase: {
    type: "service_account",
    project_id: "ecommerce-backend-ch",
    private_key_id: "56a1b717bd729d3b729a9cf77b1eb7ccb7f14b33",
    private_key:
      process.env.KEYFIREBASE,
    client_email:
      "firebase-adminsdk-s3ezr@ecommerce-backend-ch.iam.gserviceaccount.com",
    client_id: "103263014732683230384",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-s3ezr%40ecommerce-backend-ch.iam.gserviceaccount.com",
  },
};