import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { $businesses, getBusinessesFx } from '../index'

export const useBusinesses = () => {
  const [businesses, loading] = useUnit([$businesses, getBusinessesFx.pending])

  useEffect(() => {
    getBusinessesFx()
  }, [])

  return [businesses, loading] as const
}