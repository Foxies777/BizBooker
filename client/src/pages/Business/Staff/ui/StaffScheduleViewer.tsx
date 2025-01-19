import React, { useEffect, useState } from "react";
import { Button, Spin, List, Modal, notification } from "antd";
import { useStaffSchedules } from "../hooks/useStaffSchedules";
import AddScheduleForm from "./ScheduleForm/AddScheduleForm";
import dayjs from "dayjs";

interface StaffScheduleViewerProps {
    staffId: string;
    businessId: string;
}

const StaffScheduleViewer: React.FC<StaffScheduleViewerProps> = ({
    staffId,
    businessId,
}) => {
    const { schedules, fetchStaffSchedules, loading,  } =
        useStaffSchedules(staffId, businessId); 
    const [isModalOpen, setModalOpen] = useState(false);
    useEffect(() => {
        fetchStaffSchedules(); 
    }, [staffId, businessId]); 

    const handleAddScheduleClick = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        fetchStaffSchedules();
    };

    return (
        <div>
            <h2>Расписание сотрудника</h2>
            {loading ? (
                <Spin />
            ) : schedules.length > 0 ? (
                <List
                    itemLayout="vertical"
                    dataSource={schedules}
                    renderItem={(schedule) => (
                        <List.Item key={schedule._id}>
                            <List.Item.Meta
                                title={`Тип: ${schedule.scheduleType}`}
                                description={`Даты: ${dayjs(
                                    schedule.startDate
                                ).format("DD.MM.YYYY")} - ${dayjs(
                                    schedule.endDate
                                ).format("DD.MM.YYYY")}`}
                            />
                            <p>
                                Время работы: {schedule.workHours.startTime} -{" "}
                                {schedule.workHours.endTime}
                            </p>
                            <p>
                                Выходные:{" "}
                                {schedule.daysOff?.join(", ") || "Нет"}
                            </p>
                            {schedule.workHours.breaks?.map((breaks, index) => (
                                <p key={index}>
                                    {breaks.startBreak} - {breaks.endBreak}
                                </p>
                            )) || "Нет"}
                        </List.Item>
                    )}
                />
            ) : (
                <div>
                    <p>Нет расписания</p>
                    <Button type="primary" onClick={handleAddScheduleClick}>
                        Добавить расписание
                    </Button>
                </div>
            )}
            <Modal
                open={isModalOpen}
                footer={null}
                onCancel={handleModalClose}
                destroyOnClose
            >
                <AddScheduleForm
                    visible={isModalOpen}
                    onClose={handleModalClose}
                    staffId={staffId}
                    businessId={businessId}
                />
            </Modal>
        </div>
    );
};

export default StaffScheduleViewer;
