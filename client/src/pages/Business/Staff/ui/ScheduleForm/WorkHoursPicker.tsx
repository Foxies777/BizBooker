import { Form, TimePicker, Space } from "antd"
import { Dayjs } from "dayjs"

interface WorkHoursPickerProps {
  workTime: { startTime: Dayjs; endTime: Dayjs }
  setWorkTime: (time: { startTime: Dayjs; endTime: Dayjs }) => void
}

const WorkHoursPicker: React.FC<WorkHoursPickerProps> = ({ workTime, setWorkTime }) => {
  return (
    <Form.Item label="Время начала и окончания работы">
      <Space>
        <TimePicker
          value={workTime.startTime}
          onChange={(time) =>
            setWorkTime({ startTime: time!, endTime: workTime.endTime })
          }
          format="HH:mm"
          placeholder="Начало работы"
        />
        <TimePicker
          value={workTime.endTime}
          onChange={(time) =>
            setWorkTime({ startTime: workTime.startTime, endTime: time! })
          }
          format="HH:mm"
          placeholder="Конец работы"
        />
      </Space>
    </Form.Item>
  )
}

export default WorkHoursPicker
