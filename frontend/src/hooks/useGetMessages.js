import React, {useEffect} from 'react'
import useConversation from "../zustand/useConversation.js";
import toast from "react-hot-toast";
import conversations from "../components/sidebar/Conversations.jsx";

const UseGetMessages = () => {
    const [loading, setLoading] = React.useState(false)
    const {messages, setMessages, selectedConversation} = useConversation()

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/messages/${selectedConversation._id}`)
                const data = await res.json()
                if (data.error){
                    throw new Error(data.error)
                }
                setMessages(data)
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        if (selectedConversation?._id) getMessages().then(() => {
            console.log('Messages loaded successfully.')
        })
    }, [selectedConversation?._id, setMessages]);
    return {messages, loading}
}
export default UseGetMessages
