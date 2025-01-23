import React, {useContext} from 'react'
import {AuthContext} from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

const UseLogout = () => {
    const [loading, setLoading] = React.useState(false)
    const {setAuthUser} = useContext(AuthContext)

    const logout = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
            })
            const data = await res.json()
            if (data.error){
                throw new Error(data.error)
            }
            localStorage.removeItem("chat-user")
            setAuthUser(null);
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return {loading, logout}
}
export default UseLogout
