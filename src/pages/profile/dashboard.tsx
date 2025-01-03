/* eslint-disable react/no-unescaped-entities */
import { GetUserCredentials } from "@/query/user";
import ThemedButton from "@/utilities/button";
import ActionModal from "@/utilities/modals/action_modal";
import ThemedText from "@/utilities/typography";
import { DocumentData } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DashboardComponent = ()=>{
    const session = useSession()
    const [userData, setUserData] = useState<DocumentData>()
    
    useEffect(()=>{
        const getUser = async()=>{
        const user = await GetUserCredentials(session.data?.user?.email as string)
        setUserData(user)
        }
        getUser()
    },[session.data?.user?.email]);
    const router = useRouter()
    const admin = userData?.data.role == 'admin'

    return (
        <>
            <div className="flex flex-row justify-between items-center">
                <ThemedText variant="title" color="primary" className="font-semibold">Tableau de bord d'utilisateur</ThemedText>
                {admin && <ThemedButton onClick={()=> router.push("/admin")}>Panel d'administration</ThemedButton>}
            </div>
            <div>
                <ThemedText>Informations sur l'utilisateur</ThemedText>
                <ThemedText>{userData?.data.name}</ThemedText>
            </div>
            {userData?.data.message &&
                <ActionModal 
                title="Message"
                accept_action={()=>{}}
                accept_placeholder="Ok"
                refuse_placeholder="Fermer"
                >
                    {userData?.data.message}
                </ActionModal>
            }
        </>
    )
}

export default DashboardComponent;