import { projectFirebase, timestamp } from "../firebaseConfig/config";
import { useReducer, useState, useEffect } from 'react'

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case "IS_PENDING":
            return {
                isPending: true, document: null,
                success: false, error: null
            }
        case "ADDED_DOCUMENT":
            return {
                isPending: false, document: action.payload,
                success: true, error: null
            }
        case "DELETED_DOCUMENT":
            return {
                isPending: false, document: null,
                success: true, error: null
            }
        case "UPDATED_DOCUMENT":
            return {
                isPending: false, document: action.payload,
                success: true, error: null
            }
        case "ERROR":
            return {
                isPending: false, document: null,
                success: false, error: action.payload
            }
        default:
            return state
    }
}

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    const ref = projectFirebase.collection(collection)

    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    const addDocument = async (data) => {

        dispatch({ type: "IS_PENDING" })

        try {
            const createdAt = timestamp.fromDate(new Date())
            const doc = await ref.add({ ...data, createdAt })

            dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: doc })

        } catch (err) {
            dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
            console.log(err.message);
        }
    }

    const deleteDocument = async (id) => {
        dispatch({ type: "IS_PENDING" })
        try {
            await ref.doc(id).delete()
            dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" })
        } catch (err) {
            dispatchIfNotCancelled({ type: "ERROR", payload: "Could not delete the document" })
            console.log(err.message);
        }
    }

    const updateDocument = async (id, updates) => {
        dispatch({ type: "IS_PENDING" })
        try {
            const updatedDocument = await ref.doc(id).update(updates)
            dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT", payload: updatedDocument })
            return updatedDocument
        } catch (err) {
            dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
            console.log(err.message);
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true);
    })

    return { addDocument, deleteDocument, updateDocument, response }
}