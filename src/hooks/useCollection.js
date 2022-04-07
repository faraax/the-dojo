import { useEffect, useRef, useState } from "react";
import { projectFirebase } from "../firebaseConfig/config";


export const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect(() => {
        let ref = projectFirebase.collection(collection)

        if (query) {
            ref = ref.where(...query)
        }
        if (orderBy) {
            ref = ref.orderBy(...orderBy)
        }

        const unsub = ref.onSnapshot((snapshot) => {
            const result = []
            snapshot.docs.forEach(doc => {
                result.push({ ...doc.data(), id: doc.id })
            })
            setDocuments(result)
            setError(null)
        }, (err) => {
            console.log(err);
            setError("Could not fetch Data")
        })

        return () => unsub()

    }, [collection, query, orderBy])

    return { documents, error }
}

// export default { useCollection };