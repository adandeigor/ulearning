import ThemedText from "@/utilities/typography"
import AdminPanel from ".."

const UserComponent = ()=>{
    return (
        <AdminPanel>
            <div>
                <ThemedText color="gray">Users</ThemedText>
            </div>
        </AdminPanel>
    )
}

export default UserComponent