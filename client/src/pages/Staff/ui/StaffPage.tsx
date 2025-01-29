import { useStaffDetails } from "../hooks/useStaffDetails";
import { Spin, Card, List } from "antd";
import dayjs from "dayjs";
import { Navbar } from "../../Business";
import StaffBookings from "./StaffBooking";
import { useUnit } from "effector-react";
import { $user } from "../../Profile";

const StaffPage = () => {
    const businessData = localStorage.getItem("currentBusiness");
    const businessId = businessData ? JSON.parse(businessData).businessId._id : null;
    const user = useUnit($user)

    const [details, loading] = useStaffDetails(businessId);

    if (loading && !user) {
        return <Spin />;
    }

    if (!details) {
        return <p>Данные не найдены.</p>;
    }

    const { business, services, schedule } = details;

    return (
        <div>
            <Navbar />
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
                    {`Даты: ${dayjs(schedule?.startDate).format("DD.MM.YYYY")} - ${dayjs(
                        schedule?.endDate
                    ).format("DD.MM.YYYY")}`}
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

            {businessId && user?._id && (
                <StaffBookings businessId={businessId} staffId={user._id} />
            )}
        </div>
    );
};

export default StaffPage;
