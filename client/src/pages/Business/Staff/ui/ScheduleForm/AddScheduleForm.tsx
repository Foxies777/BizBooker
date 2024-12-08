import { Button, Form, Select, DatePicker, Modal, Calendar, Badge, notification } from "antd"
import { useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { useCreateSchedule, CreateScheduleRequest, WorkHoursPicker, ScheduleTypeSelector, BreaksPicker } from "../../index"
import '../../index'
interface AddScheduleFormProps {
  visible: boolean
  onClose: () => void
  staffId: string
  businessId: string
}

const AddScheduleForm: React.FC<AddScheduleFormProps> = ({ visible, onClose, staffId, businessId }) => {
  const { handleCreateSchedule, loading } = useCreateSchedule()
  const [form] = Form.useForm()
  const [scheduleType, setScheduleType] = useState<"temporary" | "permanent" | "recurring">("temporary")
  const [selectedDates, setSelectedDates] = useState<Dayjs[]>([])
  const [workTime, setWorkTime] = useState<{ startTime: Dayjs, endTime: Dayjs }>({ startTime: dayjs().hour(10).minute(0), endTime: dayjs().hour(22).minute(0) })

  const onFinish = async (values: any) => {
    const commonScheduleData = {
      scheduleType: scheduleType as "temporary" | "permanent" | "recurring",
      workHours: { startTime: workTime.startTime.format('HH:mm'), endTime: workTime.endTime.format('HH:mm') },
      breaks: values.breaks.map((br: any) => ({
        startBreak: br.startBreak.format('HH:mm'),
        endBreak: br.endBreak.format('HH:mm')
      })),
      staffId,
      businessId
    }

    if (scheduleType === 'recurring') {
      const requests = selectedDates.map(date => ({
        ...commonScheduleData,
        startDate: date.format('YYYY-MM-DD'),
        endDate: date.format('YYYY-MM-DD')
      }))
      console.log(requests)
      try {
        await Promise.all(requests.map(req => handleCreateSchedule(req)))
        notification.success({ message: 'Расписание успешно добавлено' })
        onClose()
      } catch (error) {
        notification.error({ message: 'Ошибка при добавлении расписания' })
        console.error(error)
      }
    } else {
      const schedule: CreateScheduleRequest = {
        ...commonScheduleData,
        startDate: values.startDate?.format('YYYY-MM-DD'),
        endDate: values.endDate?.format('YYYY-MM-DD') || '2124-01-01',
        daysOff: values.daysOff,
      }

      handleCreateSchedule(schedule)
      onClose()
    }
  }

  const handleScheduleTypeChange = (type: "temporary" | "permanent" | "recurring") => {
    setScheduleType(type)
    form.resetFields()
    setSelectedDates([])
  }

  const onSelect = (date: Dayjs) => {
    if (date.day() === 0 || date.day() === 6) { // Exclude weekends
      return
    }
    setSelectedDates(prev => {
      if (prev.some(d => d.isSame(date, 'day'))) {
        return prev.filter(d => !d.isSame(date, 'day'))
      } else {
        return [...prev, date]
      }
    })
  }

  const dateCellRender = (value: Dayjs) => {
    const isSelected = selectedDates.some(date => date.isSame(value, 'day'))
    return isSelected ? <Badge status="success" /> : null
  }

  return (
    <Modal
      open={visible}
      title="Добавить расписание"
      onCancel={onClose}
      footer={null}
    >
      <ScheduleTypeSelector currentType={scheduleType} onChange={handleScheduleTypeChange} />
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <WorkHoursPicker workTime={workTime} setWorkTime={setWorkTime} />
        {scheduleType !== 'recurring' && (
          <>
            <Form.Item
              name="startDate"
              label="Дата начала"
              rules={[{ required: true, message: "Выберите дату начала" }]}
            >
              <DatePicker placeholder="Выберите дату начала" />
            </Form.Item>
            {scheduleType === 'temporary' && (
              <Form.Item
                name="endDate"
                label="Дата окончания"
                rules={[{ required: true, message: "Выберите дату окончания" }]}
              >
                <DatePicker placeholder="Выберите дату окончания" />
              </Form.Item>
            )}
          </>
        )}
        {scheduleType === 'recurring' && (
          <Form.Item label="Выберите рабочие дни">
            <Calendar fullscreen={false} onSelect={onSelect} cellRender={dateCellRender} />
          </Form.Item>
        )}
        <Form.Item
          name="daysOff"
          label="Выходные дни"
        >
          <Select mode="tags" placeholder="Выберите выходные дни">
            <Select.Option value="Monday">Понедельник</Select.Option>
            <Select.Option value="Tuesday">Вторник</Select.Option>
            <Select.Option value="Wednesday">Среда</Select.Option>
            <Select.Option value="Thursday">Четверг</Select.Option>
            <Select.Option value="Friday">Пятница</Select.Option>
            <Select.Option value="Saturday">Суббота</Select.Option>
            <Select.Option value="Sunday">Воскресенье</Select.Option>
          </Select>
        </Form.Item>
        <BreaksPicker />
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Добавить расписание
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddScheduleForm
