import { useEffect } from 'react'
import { Form, Input, InputNumber, Modal, notification, Select } from 'antd';
import { IUser } from './UserTable';

interface IAddModal {
    record: null | IUser;
    setRecord: any;
    accessToken: string;
    getAllUsers: any;
    isEditModalOpen: boolean;
    setIsEditModalOpen: (v: boolean) => void;
}

export default function EditUserModal(props: IAddModal) {
    const { record, setRecord, accessToken, getAllUsers, isEditModalOpen, setIsEditModalOpen } = props

    const [form] = Form.useForm();
    const { Option } = Select;

    useEffect(() => {
        if (record) {
            form.setFieldsValue(record)
        }
    }, [record])

    const onFinish = async (values: any) => {
        const { _id, name, email, age, gender, address, role } = values;

        if (record) {
            const data = { _id: record._id, name, email, age, gender, address, role }
            const req = await fetch(`http://localhost:8000/api/v1/users`, {
                method: "PATCH",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...data }),
            })
            const res = await req.json();

            if (res.data) {
                await getAllUsers();
                notification.success({
                    message: "User edited successfully. Table is updated."
                })
                setIsEditModalOpen(false);
            } else {
                notification.error({
                    message: "Something went wrong",
                    description: res.message
                })
            }
        }

    };

    const handleCancel = () => {
        form.resetFields();
        setIsEditModalOpen(false);
        setRecord(null);
    }

    return (
        <Modal title="Edit User" open={isEditModalOpen} onOk={() => { form.submit() }} onCancel={handleCancel} maskClosable={false}>
            <Form
                form={form}
                name="add user"
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    label="Name:"
                    name="name"
                    rules={[{ required: true, message: 'Name cannot be empty!' }]} >
                    <Input placeholder="input name" />
                </Form.Item>

                <Form.Item
                    label="Email:"
                    name="email"
                    rules={[{ required: true, message: 'Email cannot be empty!' }]} >
                    <Input placeholder="input email" />
                </Form.Item>

                <Form.Item
                    label="Password:"
                    name="password"
                    rules={[{ required: record ? false : true, message: 'Password cannot be empty!' }]} >
                    <Input.Password disabled={record ? true : false} placeholder="input password" />
                </Form.Item>

                <Form.Item
                    label="Age:"
                    name="age"
                    rules={[{ required: true, message: 'Age cannot be empty!' }]} >
                    <InputNumber placeholder="input age" />
                </Form.Item>

                <Form.Item
                    label="Gender:"
                    name="gender"
                    rules={[{ required: true, message: 'Gender cannot be empty!' }]} >
                    <Select placeholder="Choose user's gender" >
                        <Option value="MALE">Male</Option>
                        <Option value="FEMALE">Female</Option>
                        <Option value="OTHER">Other</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Address:"
                    name="address"
                    rules={[{ required: true, message: 'Address cannot be empty!' }]} >
                    <Input placeholder="input address" />
                </Form.Item>

                <Form.Item
                    label="Role:"
                    name="role"
                    rules={[{ required: true, message: 'Role cannot be empty!' }]} >
                    <Select placeholder="Choose user's role" >
                        <Option value="ADMIN">ADMIN</Option>
                        <Option value="USER">USER</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}