import { useEffect, useState } from 'react'
// import '../../styles/user.css'
import { Button, notification, Table, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';

export interface IUser {
  _id: string;
  email: string;
  name: string;
  role: string;
  gender: string;
  address: string;
  password: string;
  age: string
}

export default function UserTable() {
  const accessToken = localStorage.getItem("access_token")!!

  const [userList, setUserList] = useState([]);
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 5,
    pages: 0,
    total: 0
  })

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [record, setRecord] = useState<null | IUser>(null);

  useEffect(() => {
    getAllUsers()
  }, [])

  const getAllUsers = async () => {
    const req = await fetch(`http://localhost:8000/api/v1/users?current=${meta.current}&pageSize=${meta.pageSize}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const res = await req.json();
    setUserList(res.data.result);
    setMeta(res.data.meta);
  }

  const deleteUser = async (_id: string) => {
    const data = { _id }

    const req = await fetch(`http://localhost:8000/api/v1/users/${_id}`, {
      method: "DELETE",
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
        message: "User deleted successfully."
      })
    } else {
      notification.error({
        message: "Something went wrong",
        description: res.message
      })
    }
  }

  const columns: ColumnsType<IUser> = [
    { title: 'Email', dataIndex: 'email' },
    { title: 'Name', dataIndex: 'name', },
    { title: 'Role', dataIndex: 'role', },
    {
      title: 'Action', render(record) {
        return (
          <div>
            <Button icon={<EditOutlined />} onClick={() => {
              setRecord(record)
              setIsEditModalOpen(true);
            }}>Edit</Button>
            <Popconfirm
              title="Delete user"
              description={`Are you sure you want to delete user: ${record.name}?`}
              onConfirm={async () => {
                await deleteUser(record._id);
              }}
              onCancel={() => { }}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </div>
        )
      },
    }
  ]

  const handlePageChange = async (page: number, pageSize: number) => {
    const req = await fetch(`http://localhost:8000/api/v1/users?current=${page}&pageSize=${pageSize}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const res = await req.json();
    setUserList(res.data.result);
    setMeta(res.data.meta);
  }

  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2>Users Table</h2>
        <Button icon={<PlusOutlined />} type="primary" onClick={() => { setIsAddModalOpen(true); }}>Add User</Button>
        <AddUserModal accessToken={accessToken} getAllUsers={getAllUsers} isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} />
        <EditUserModal record={record} setRecord={setRecord} accessToken={accessToken} getAllUsers={getAllUsers} isEditModalOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen} />
      </div>
      <Table dataSource={userList} columns={columns} rowKey={"_id"}
        pagination={{
          current: meta.current,
          pageSize: meta.pageSize,
          defaultPageSize: meta.pages,
          total: meta.total,
          showTotal: (total, range) => `${range[0]}-${range[1]} of total ${total} items`,
          onChange: (page: number, pageSize: number) => handlePageChange(page, pageSize),
          showSizeChanger: true
        }}
      />
    </div>
  )
}