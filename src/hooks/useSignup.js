import { useState, useEffect } from "react"
import { projectAuth, projectStorage, projectFirebase } from "../firebaseConfig/config"
import { useAuthContext } from "./useAuthContext";


export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext()


    const signup = async (email, password, displayName, thumbnail) => {
        setError(null)
        setIsPending(true)
        try {
            const res = await projectAuth.createUserWithEmailAndPassword(email, password);
            if (!res) {
                throw new Error('Could not complete signup');
            }

            const uploadPath = `thumbnail/${res.user.uid}/${thumbnail.name}`;
            const img = await projectStorage.ref(uploadPath).put(thumbnail)
            const imgURL = await img.ref.getDownloadURL()

            await res.user.updateProfile({
                displayName,
                photoURL: imgURL
            })
            await projectFirebase.collection('users').doc(res.user.uid).set({
                online: true,
                displayName,
                photoURL: imgURL
            })

            dispatch({ type: 'LOGIN', payload: res.user })

            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        } catch (err) {
            if (!isCancelled) {
                console.log(err.message);
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { error, isPending, signup }

}