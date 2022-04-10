import { useEffect, useState } from "react"
import { projectFirebase } from "../firebaseConfig/config"


export const useDocument = (collection, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    // Real time Data BaseF

    useEffect(() => {
        const ref = projectFirebase.collection(collection).doc(id)
        const unsub = ref.onSnapshot((snapshot) => {
            if (snapshot.data()) {
                setDocument({ ...snapshot.data(), id: snapshot.id })
                setError(null)
            } else {
                setError("The page your requested is not found")
            }
            // if (!document) {
            //     // console.log(document);
            // }
        },
            (err) => {
                console.log(err.message);
                setError("Failed To Get Documents")
            }
        )
        return () => unsub()

    }, [collection, id])

    return { document, error }
}