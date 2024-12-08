import { Button, Layout, Card, Row, Col, Spin } from "antd"
import { CalendarOutlined } from "@ant-design/icons"
import { useState } from "react"
import { AddScheduleForm, AddStaff, Navbar, useGetBusinessStaffs } from ".."
import { useUnit } from "effector-react"
import { $currentBusiness } from "../../../../shared/business"
import BusinessNavbar from "../../../../components/BusinessNavbar"

const { Meta } = Card

const Staffs = () => {
    const [businessStaffs, loading] = useGetBusinessStaffs()
    const [selectedStaff, setSelectedStaff] = useState<string | null>(null)
    const currentBusiness = useUnit($currentBusiness)

    const handleAddSchedule = (staffId: string) => {
        setSelectedStaff(staffId)
    }

    const handleClose = () => {
        setSelectedStaff(null)
    }

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Navbar />
            <BusinessNavbar selectKey="4">
                <AddStaff />
                {loading ? (
                    <Spin />
                ) : (
                    <Row gutter={[16, 16]}>
                        {businessStaffs.map((staff) => (
                            <Col key={staff._id} xs={24} sm={12} md={8} lg={6}>
                                <Card
                                    title={staff.name}
                                    actions={[
                                        <Button
                                            type="link"
                                            icon={<CalendarOutlined />}
                                            onClick={() => handleAddSchedule(staff._id)}
                                            style={{ float: 'right' }}
                                        >
                                        </Button>
                                    ]}
                                >
                                    <p>Email: {staff.email}</p>
                                    <p>Телефон: {staff.phone}</p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
                {selectedStaff && (
                    <AddScheduleForm
                        visible={true}
                        onClose={handleClose}
                        staffId={selectedStaff}
                        businessId={currentBusiness?._id}
                    />
                )}
            </BusinessNavbar>
        </Layout>
    )
}

export default Staffs