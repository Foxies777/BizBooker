import Booking from "./Booking/Booking"

interface BusinessProps {
  _id: string
  title: string
  description: string
  category: any;
}

const Business = ({ _id, title, description, category  }: BusinessProps) => {

  console.log(category);
  
  return (
      <>
          <h3>{title}</h3>
          <p>{description}</p>
          <p><b>{category.name}</b></p>
          <Booking businessId={_id}/>
      </>
  )
}
export default Business