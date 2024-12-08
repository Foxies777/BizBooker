// Profile.tsx
import Navbar from "../../../components/Navigation"
import { Spin } from "antd"
import { useProfile } from "../../../context/ProfileContext"

const Profile = () => {
    const { user, loading } = useProfile()
    console.log(loading)

    if (loading) {
        return <Spin />
    }

    return (
        <div>
            <Navbar />
            {user ? (
                <>
                    <h1>
                        Welcome, {user.name} {user.surname}
                    </h1>
                    <p>Role: {user.role}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                </>
            ) : (
                <>
                    <h1>Профиль</h1>
                    <p>Нет доступных пользовательских данных.</p>
                </>
            )}
        </div>
    )
}

export default Profile
