import './style.css'
import { Client, Databases, ID } from "appwrite";
import { PROJECT_ID, DATABASE_ID, COLLECTION_ID } from './shhh.js';




const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const databases = new Databases(client);

const form = document.querySelector ('form')
form.addEventListener('submit', addJob)

/* Creating Jobs from the form */
function addJob(e) {
 e.preventDefault()
 const job = databases.createDocument(
    DATABASE_ID,
    COLLECTION_ID,
    ID.unique(),
    { 
      "company-name": e.target.companyName.value,
      "date-added" : e.target.dateAdded.value,
      "role" : e.target.role.value,
      "location" : e.target.location.value,
      "position-type" : e.target.positionType.value,
      "source" : e.target.source.value
    
     }
);

job.then(function (response) {
    addJobsToDom()
}, function (error) {
    console.log(error);
});

    form.reset()
}



/* Getting back jobs listings from the database */
async function addJobsToDom() {
    document.querySelector('ul').innerHTML = ''
    let response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID
    );
    response.documents.forEach((job) => {
        const li = document.createElement('li')
        li.textContent = `${job['company-name']} ${job['date-added']} ${job['role']} ${job['location']} ${job['position-type']} ${job['source']} coffee chat? ${job['chat']}`

        li.id = job['$id']

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => removeJob(job['$id']);
        

        const coffeebutton = document.createElement('button');
        coffeebutton.textContent = '☕';
        coffeebutton.onclick = () => updateChat(job['$id']);

        li.appendChild(coffeebutton);
        li.appendChild(deleteButton);
        document.querySelector('ul').appendChild(li)
    })

    async function removeJob(id) {
        const result = await databases.deleteDocument(
            DATABASE_ID, // databaseId
            COLLECTION_ID, // collectionId
            id // documentId
        );
        document.getElementById(id).remove();
    }

    async function updateChat(id) {
        const result = databases.updateDocument(
            DATABASE_ID, // databaseId
            COLLECTION_ID, // collectionId
            id, // documentId
            {'chat': true}, // data (optional)
            
        );
         result.then(function(){location.reload()}) 

    }
    //console.log(response )
    /*
        promise.then(function (response) {
            console.log(response);
        }, function (error) {
            console.log(error);
        });
    */
}

addJobsToDom()

/*
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
*/


