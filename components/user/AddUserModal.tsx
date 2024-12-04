import { Input, Modal, notification, Form, Select, InputNumber } from 'antd';

interface IAddModal {
    accessToken: string;
    getAllUsers: any;
    isAddModalOpen: boolean;
    setIsAddModalOpen: (v: boolean) => void;
}

export default function AddUserModal(props: IAddModal) {
    const { accessToken, getAllUsers, isAddModalOpen, setIsAddModalOpen } = props

    const [form] = Form.useForm();
    const { Option } = Select;

    const handleCancel = () => {
        form.resetFields();
        setIsAddModalOpen(false);
    }

    const onFinish = async (values: any) => {
        const { name, email, password, age, gender, address, role } = values;
        const data = { name, email, password, age, gender, address, role };

        const req = await fetch("http://localhost:8000/api/v1/users", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        const res = await req.json();

        if (res.data) {
            await getAllUsers();
            notification.success({
                message: "New user added successfully."
            })
            setIsAddModalOpen(false);
        } else {
            notification.error({
                message: "Something went wrong",
                description: res.message
            })
        }
    };

    return (
        <Modal title="Add New User" open={isAddModalOpen} onOk={() => { form.submit() }} onCancel={handleCancel} maskClosable={false}>
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
                    rules={[{ required: true, message: 'Password cannot be empty!' }]} >
                    <Input.Password placeholder="input password" />
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