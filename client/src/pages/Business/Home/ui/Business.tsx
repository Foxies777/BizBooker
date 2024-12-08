import { Layout } from "antd"
import { Navbar } from "../index"
import { useUnit } from "effector-react"
import { $currentBusiness } from "../../../../shared/business"
import BusinessNavbar from "../../../../components/BusinessNavbar"


const Business = () => {
    const currentBusiness = useUnit($currentBusiness)
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Navbar />
            <BusinessNavbar selectKey="1">
                <h1>{currentBusiness.name}</h1>
                <p>{currentBusiness.description}</p>
                <p>Phone: {currentBusiness.phone}</p>
                <p>Email: {currentBusiness.email}</p>
                <p>Address: {currentBusiness.address}</p>
                {/* <p>Category: {business.category}</p> */}
            </BusinessNavbar>
        </Layout>
    )
}

export default Business
