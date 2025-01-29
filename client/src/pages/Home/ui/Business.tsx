import Booking from "./Booking/Booking"

interface BusinessProps {
  _id: string
  title: string
  description: string
}

const Business = ({ _id, title, description }: BusinessProps) => {

  
  return (
      <>
          <h3>{title}</h3>
          <p>{description}</p>
          <Booking businessId={_id}/>
      </>
  )
}
export default Business