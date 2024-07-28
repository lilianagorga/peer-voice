import * as sdk from "node-appwrite";

export const {
  ENDPOINT,
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  COURSE_COLLECTION_ID,
  CONTENT_COLLECTION_ID,
  MEDIA_EXPERT_COLLECTION_ID,
  PLATFORM_COLLECTION_ID,
  PASSKEY_MAP_COLLECTION_ID,
  COURSE_PARTICIPANTS_COLLECTION_ID,
  BUCKET_ID,
} = process.env;

const client = new sdk.Client();

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const storage = new sdk.Storage(client);