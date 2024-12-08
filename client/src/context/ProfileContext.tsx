// context/ProfileContext.tsx
import React, {
    createContext,
    useContext,
    useEffect,
    ReactNode,
} from "react"
import { getUserFx, $user } from "../pages/Profile"
import { User } from "../shared/api/user/model"
import { useUnit } from "effector-react"
import { $token, tokenExprired } from "../shared/auth"

interface ProfileContextProps {
    user: User | null
    loading: boolean
    logout: () => void
}

const ProfileContext = createContext<ProfileContextProps | null>(null)

interface ProfileProviderProps {
    children: ReactNode
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
    children,
}) => {
    const [user, loading, token] = useUnit([$user, getUserFx.pending, $token])

    useEffect(() => {
        if (token) {
            getUserFx(token)
        }
    }, [token])

    

    const logout = () => {
        tokenExprired()
        localStorage.removeItem("token")
    }

    return (
        <ProfileContext.Provider value={{ user: user as User | null, loading, logout }}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfile = () => {
    const context = useContext(ProfileContext)
    if (!context) {
        throw new Error("useProfile must be used within a ProfileProvider")
    }
    return context
}
