import { Form, Input, Modal } from "antd";
import { ICheckInModalProps } from "./checkinModal";

export default function CheckInModal({open, onSubmit, handleCancel, confirmLoading}: ICheckInModalProps) {
  const [form] = Form.useForm();
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('Received values of form: ', values);
        form.resetFields();
        onSubmit(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
  return (
    <Modal
      title="New Checkin"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      rootClassName="custom-checkin-modal"
    >
      <Form form={form}>
        <Form.Item name="name" rules={[{ required: true, message: 'Please input title!' }]}>
          <Input placeholder="Check in Title"/>
        </Form.Item>
        <Form.Item name="image_url">
          <Input placeholder="Image Url"/>
        </Form.Item>
        <Form.Item name="comment" rules={[{ required: true, message: 'Please input comment!' }]}>
          <Input placeholder="description"/>
        </Form.Item>
      </Form>
    </Modal>
  )
}