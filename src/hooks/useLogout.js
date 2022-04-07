import { useState, useEffect } from "react"
import { projectAuth, projectFirebase } from "../firebaseConfig/config"
import { useAuthContext } from "./useAuthContext";


export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch, user } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        try {
            const { uid } = user
            await projectFirebase.collection('users').doc(uid).update({
                online: false
            })


            await projectAuth.signOut()

            dispatch({ type: 'LOGOUT' })


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

    return { logout, error, isPending }

}