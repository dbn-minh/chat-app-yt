import React from 'react'
import toast from "react-hot-toast";

const UseSignup = () => {
    const [loading, setLoading] = React.useState(false)
    const signUp = async ({fullName, username, password, confirmPassword, gender}) => {
        const success = handleInputErrors({fullName, username, password, confirmPassword, gender})
        if (!success) {}

        setLoading(true)
        try {
            const res = await fetch("http://localhost:8000/api/auth/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({fullName, username, password, confirmPassword, gender})
            })

            const data = await res.json()
            console.log(data)

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