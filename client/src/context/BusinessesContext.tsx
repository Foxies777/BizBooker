import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useUnit } from 'effector-react'
import { $token } from '../shared/auth'
import { getUserBusinessesFx } from '../pages/Home'
import { Business } from '../shared/api/business/model'



// Интерфейс для типа контекста
interface BusinessesContextType {
  businesses: Business[]
  loading: boolean
  error: string | null
}

const BusinessesContext = createContext<BusinessesContextType | null>(null)

interface BusinessesProviderProps {
  children: ReactNode
}

export const BusinessesProvider: React.FC<BusinessesProviderProps> = ({ children }) => {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [token] = useUnit([$token])
    
  useEffect(() => {
    if (token) {

      // Проверка валидности токена
      if (token.split('.').length === 3) {
        
        getUserBusinessesFx(token)
          .then(businesses => {
            setBusinesses(businesses)
            setLoading(false)
          })
          .catch(err => {
            console.error("Error in getUserBusinesses:", err)
            setError("Invalid token. Please log in again.")
            setLoading(false)
          })
      } else {
        console.error("Invalid token format:", token)
        setError("Invalid token format. Please log in again.")
        setLoading(false)
      }
    } else {
      setLoading(false)
      console.log(loading)
      
      setError("No token found. Please log in.")
    }
  }, [token])

  return (
    <BusinessesContext.Provider value={{ businesses, loading, error }}>
      {children}
    </BusinessesContext.Provider>
  )
}

export const useBusinesses = () => {
  const context = useContext(BusinessesContext)
  if (!context) {
    throw new Error('useBusinesses must be used within a BusinessesProvider')
  }
  return context
}
