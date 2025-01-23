import React from 'react'
import toast from "react-hot-toast";
import {useAuthContext} from "../context/AuthContext.jsx";

const UseSignup = () => {
    const [loading, setLoading] = React.useState(false)
    const {setAuthUser} = useAuthContext()
    const signUp = async ({fullName, username, password, confirmPassword, gender}) => {
        const success = handleInputErrors({fullName, username, password, confirmPassword, gender})
        if (!success) {}

        setLoading(true)
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({fullName, username, password, confirmPassword, gender})
            })

            const data = await res.json()
            if (data.error){
                throw new Error(data.error)
            }
            // localstorage
            localStorage.setItem("chat-user", JSON.stringify(data))
            // context
            setAuthUser(data)

        } catch (e) {
            console.error(e);
            toast.error(e.message);
        } finally {
            setLoading(false)
        }
    }
    return {loading, signUp}
}
export default UseSignup

function handleInputErrors({fullName, username, password, confirmPassword, gender}) {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error('Please fill in all fields')
        return false
    }

    if (password !== confirmPassword) {
        toast.error('Password must match!')
        return false
    }

    if (password.length < 6) {
        toast.error('Password must be at least 6 characters')
        return false
    }
    return true
}