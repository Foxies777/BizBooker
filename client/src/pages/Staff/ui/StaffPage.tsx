import React from "react";
import { useStaffDetails } from "../hooks/useStaffDetails";
import { Spin, Card, List } from "antd";
import dayjs from "dayjs";
import { Navbar } from "../../Business";

const StaffPage = () => {
  const businessId = localStorage.getItem("currentBusiness")
    
  
    const [details, loading] = useStaffDetails(businessId ? JSON.parse(businessId).businessId._id : null);

    if (loading) {
        return <Spin />;
    }

    if (!details) {
        return <p>Данные не найдены.</p>;
    }

    const { business, services, schedule } = details;
    console.log(schedule);
    
    return (
        <div>
            <Navbar/>
            <h1>{`Бизнес: ${business.name}`}</h1>

            <Card title="Услуги">
                <List
                    dataSource={services}
                    renderItem={(service) => (
                        <List.Item>
                            <List.Item.Meta
                                title={service.name}
                                description={service.description}
                            />
                        </List.Item>
                    )}
                />
            </Card>

            <Card title="Расписание">
                <p>{`Тип: ${schedule?.scheduleType}`}</p>
                <p>
                    {`Даты: ${dayjs(
                                    schedule?.startDate
                                ).format("DD.MM.YYYY")} - ${
                                  dayjs(
                                    schedule?.endDate
                                ).format("DD.MM.YYYY")
                    }`}
                </p>
                <p>{`Выходные: ${schedule?.daysOff?.join(", ") || "Нет"}`}</p>
                <List
                    dataSource={schedule?.workHours}
                    renderItem={(hour) => (
                        <List.Item>
                            <p>{`Рабочие часы: ${hour.startTime} - ${hour.endTime}`}</p>
                            {hour.breaks.map((br, index) => (
                                <p key={index}>
                                    {`Перерыв: ${br.startBreak} - ${br.endBreak}`}
                                </p>
                            ))}
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    );
};

export default StaffPage;
