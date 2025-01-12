import { useEffect} from 'react'
import { useUnit } from 'effector-react'
import { $user, getUserFx } from '../index'
import { $token } from '../../../shared/auth'

export const useProfile = () => {
  const [user, loading, token] = useUnit([$user, getUserFx.pending, $token])

  useEffect(() => {
    if (token) {
      getUserFx(token)
    }
  }, [token])

  return [user, loading] as const
}
