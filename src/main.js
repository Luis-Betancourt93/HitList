import './style.css'
import { PROJECT_ID, DATABASE_ID, COLLECTION_ID } from './shhh.js';


import { Client, Databases, ID } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const databases = new Databases(client);

const form = document.querySelector ('form')
form.addEventListener('submit', addJob)


const promise = databases.createDocument(
    DATABASE_ID,
    COLLECTION_ID,
    ID.unique(),
    { "company-name": "100Devs",
      "date-added" : new Date(),
      "role" : "software engineer",
      "location" : "Philly",
      "position-type" : "full time",
      "source" : "heeps://100devs.org"
     }
);

promise.then(function (response) {
    console.log(response);
}, function (error) {
    console.log(error);
});
