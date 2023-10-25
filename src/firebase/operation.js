
import { addDoc, collection, doc, updateDoc, getDoc,getDocs, deleteDoc } from "firebase/firestore"

// async function addDocument(data, ...path) {
//     try {
//         const docRef = await addDoc(collection(db, path), data);
//         console.log("Document written with ID: ", docRef.id);
//         return docRef
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// }

// async function readDocs(...collectionPath) {
//     try {
//         const collectionRef = collection(db, collectionPath)
//         const snapshot = await getDocs(collectionRef)
//         console.log(snapshot.docs)
//         return document
//         // const query = firestore.query(collection(db,"users"),firestore.where(firestore.documentId(),"==","0x6QHc8ZbhS5ACzrc85i"))
//         // const snapshot = await firestore.getDocs(query)
//         // console.log(snapshot.docs.length)

//     } catch (e) {
//         console.error(e)
//     }
// }

// async function updateDocuement(data,path) {
//     try {
//         const docRef = doc(db, path)
//         const updatedDocRef = await updateDoc(docRef, data)
//         return updatedDocRef
//     } catch (e) {
//         console.error(e)
//     }
// }



class FirestoreAPI {
    constructor(db) {
       this.db = db
      }
    async addDocument(data, parentPath,...path) {
      try {
        const docRef = await addDoc(collection(this.db, parentPath,...path), data);
        console.log("Document written with ID: ", docRef.id);
        return docRef;
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  
    async readDocs(parentPath ,...collectionPath) {
      try {
        const collectionRef = collection(this.db,parentPath, ...collectionPath);
        const snapshot = await getDocs(collectionRef);
        console.log(snapshot.docs);
        return snapshot.docs; // Note: You should return the snapshot.docs, not 'document'
      } catch (e) {
        console.error(e);
      }
    }
  
    async updateDocument(data, path,id) {
      try {
        const docRef = doc(this.db, path,id);
        const updatedDocRef = await updateDoc(docRef, data);
        return updatedDocRef;
      } catch (e) {
        console.error(e);
      }
    }
    async readDoc(path,id){
        const docRef = doc(this.db,path,id)
        const document  = await getDoc(docRef)
        return document
    }
    async deleteDoc(path,id){
        const docRef = doc(this.db,path,id)
        return await deleteDoc(docRef)
    }
  }

  
export {FirestoreAPI};
// export { addDocument, readDocs, updateDocuement }