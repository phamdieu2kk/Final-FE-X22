import { useState, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import UploadImage from "../Components/UploadImage";
import api from "../api";
import { setAccessToken } from "../api/core";

const UpdateAccountForm = () => {
  const [avatar, setAvatar] = useState();
  const [notify, notifyContextHolder] = notification.useNotification();
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    if (notificationMessage) {
      notify[notificationMessage.type]({
        message: notificationMessage.title,
        description: notificationMessage.description,
      });
    }
  }, [notificationMessage, notify]);

  const handleFinish = async (values) => {
    try {
      const response = await api.putUpdateAccountForm(values);
  
      if (response.success) {
        setAccessToken(`Bearer ${response.data.token}`);
  
        
        setNotificationMessage({
          type: "success",
          title: "Thành công",
          description: "Cập nhật thông tin cá nhân thành công",
        });
      } else {
        setNotificationMessage({
          type: "error",
          title: "Thất bại",
          description: "Cập nhật thông tin cá nhân thất bại",
        });
      }
    } catch (error) {
      console.error("Error updating account:", error);
      setNotificationMessage({
        type: "error",
        title: "Thất bại",
        description: "Cập nhật thông tin cá nhân thất bại",
      });
    }
  };

  return (
    <div className="content">
      <Form className="updateAccountForm" layout="vertical" onFinish={handleFinish}>
        {notifyContextHolder}
       
        <Form.Item>
          <img style={{ width:"10%", borderRadius:"100%" }} src={avatar} alt="Avatar" />
          <UploadImage setImageUrl={setAvatar} />
        </Form.Item>

        <Form.Item
          label="Họ và tên"
          name="fullName"
          rules={[{ required: true, message: "Họ và tên bắt buộc nhập", whitespace: true }]}
        >
          <Input maxLength={100} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email bắt buộc nhập" },
            { type: "email", message: "Email không đúng định dạng" },
          ]}
        >
          <Input maxLength={256} />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Mật khẩu bắt buộc nhập", whitespace: true }]}
        >
          <Input.Password maxLength={100} />
        </Form.Item>

        <Form.Item label="Mô tả bản thân" name="bio">
          <Input.TextArea maxLength={500} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" 
          style={{ width:"100%", textAlign: "center"}}>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
      
    </div>
  );
};

export default UpdateAccountForm;