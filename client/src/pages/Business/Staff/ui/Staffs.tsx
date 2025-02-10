import React, { useState } from "react";
import { Button, Layout, Card, Row, Col, Spin, Modal } from "antd";
import { AppstoreAddOutlined, CalendarOutlined } from "@ant-design/icons";
import { AddScheduleForm, Navbar, useGetBusinessStaffs } from "..";
import { useUnit } from "effector-react";
import { $currentBusiness } from "../../../../shared/business";
import BusinessNavbar from "../../../../components/BusinessNavbar";
import ModalStaffService from "./ModalStaffService";
import InviteStaff from "./InviteStaff";
import StaffScheduleViewer from "./StaffScheduleViewer";
import "../styles/Staffs.css"; // Импортируем стили

interface Staff {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    status: "pending" | "active";
    services?: {
        id: string;
        name: string;
    }[];
}

const StaffCard: React.FC<{
    staff: Staff;
    onOpenModal: (type: "schedule" | "service", staff: Staff) => void;
    onViewSchedule: (staff: Staff) => void;
}> = ({ staff, onOpenModal, onViewSchedule }) => (
    <Col key={staff.id} xs={24} sm={12} md={8} lg={6}>
        <Card
            title={staff.name}
            className="staff-card"
            actions={[
                <div className="card-actions">
                    <Button
                        type="link"
                        icon={<CalendarOutlined />}
                        onClick={() => onOpenModal("schedule", staff)}
                        className="action-button"
                    />
                    <Button
                        type="link"
                        icon={<AppstoreAddOutlined />}
                        onClick={() => onOpenModal("service", staff)}
                        className="action-button"
                    />
                </div>,
            ]}
        >
            <p>Email: {staff.email || "Не указано"}</p>
            <p>Телефон: {staff.phone || "Не указано"}</p>
            <p>Статус: {staff.status}</p>
            <p>
                Услуги:{" "}
                {staff.services && staff.services.length > 0
                    ? staff.services.map((service) => service.name).join(", ")
                    : "Нет услуг"}
            </p>
            <Button
                type="link"
                onClick={() => onViewSchedule(staff)}
                className="view-schedule-button"
            >
                Просмотреть расписание
            </Button>
        </Card>
    </Col>
);

const Staffs: React.FC = () => {
    const [pendingStaff, activeStaff, loading] = useGetBusinessStaffs();
    const businessStaffs = [...pendingStaff, ...activeStaff];
    const [modalState, setModalState] = useState<{
        type: "schedule" | "service" | null;
        staff: Staff | null;
    }>({ type: null, staff: null });
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
    const [isScheduleViewerOpen, setScheduleViewerOpen] = useState(false);

    const currentBusiness = useUnit($currentBusiness);

    const handleOpenModal = (type: "schedule" | "service", staff: Staff) => {
        setModalState({ type, staff });
    };

    const handleCloseModal = () => {
        setModalState({ type: null, staff: null });
    };

    const handleViewSchedule = (staff: Staff) => {
        setSelectedStaff(staff);
        setScheduleViewerOpen(true);
    };

    const handleCloseScheduleViewer = () => {
        setSelectedStaff(null);
        setScheduleViewerOpen(false);
    };
    console.log('1111111111111 ',businessStaffs);
    
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Navbar />
            <BusinessNavbar selectKey="4">
                <InviteStaff businessId={currentBusiness?._id} />
                {loading ? (
                    <Spin className="loading-spinner" />
                ) : (
                    <Row gutter={[16, 16]} className="staff-grid">
                        {businessStaffs.map((staff: Staff) => (
                            <StaffCard
                                key={staff.id}
                                staff={staff}
                                onOpenModal={handleOpenModal}
                                onViewSchedule={handleViewSchedule}
                            />
                        ))}
                    </Row>
                )}
                {modalState.type === "schedule" && modalState.staff && (
                    <AddScheduleForm
                        visible={true}
                        onClose={handleCloseModal}
                        staffId={modalState.staff.id}
                        businessId={currentBusiness?._id}
                    />
                )}
                {modalState.type === "service" && modalState.staff && (
                    <ModalStaffService
                        visible={true}
                        onClose={handleCloseModal}
                        staff={modalState.staff}
                    />
                )}
                <Modal
                    open={isScheduleViewerOpen}
                    footer={null}
                    onCancel={handleCloseScheduleViewer}
                    destroyOnClose
                    className="schedule-viewer-modal"
                >
                    {selectedStaff && (
                        <StaffScheduleViewer
                            staffId={selectedStaff.id}
                            businessId={currentBusiness._id}
                        />
                    )}
                </Modal>
            </BusinessNavbar>
        </Layout>
    );
};
export default Staffs