/*eslint-disable*/
import { useState, useEffect, useContext } from "react";
import { Form, Input, Button, notification,Typography } from "antd";
import UploadImage from "../Components/UploadImage";
import api from "../api";
import AuthContext from "../context/AuthContext";

const UpdateAccountForm = () => {
    const [updateForm] = Form.useForm();
    const [avatar, setAvatar] = useState();
    const [notify, notifyContextHolder] = notification.useNotification();
    const [notificationMessage, setNotificationMessage] = useState(null);
    const { currentUser, setCurrentUser } = useContext(AuthContext);

    useEffect(() => {
        if (notificationMessage) {
            notify[notificationMessage.type]({
                message: notificationMessage.title,
                description: notificationMessage.description,
            });
        }
    }, [notificationMessage, notify]);

    useEffect(() => {
        if (currentUser) {
            updateForm.setFieldValue("name", currentUser.user.name);
            updateForm.setFieldValue("email", currentUser.user.email);
            // updateForm.setFieldValue("gender", currentUser.user.gender);
            updateForm.setFieldValue("bio", currentUser.user.bio);
        }
    }, [currentUser]);

    const handleFinish = async (values) => {
        try {
            console.log(values);
            if (avatar) {
                values.avatarImg = avatar;
            }
            // Attach token to the request headers
            const response = await api.putUpdateAccountForm.invoke({
                data: values,
            });

            console.log("response", response);
            if (response.status === 200) {
                // Update user
                setCurrentUser({
                    ...currentUser,
                    user: response.data.data,
                });

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
        <div className="container">
            <Typography.Title 
        style={{ textAlign: "center"}}>
          Cập nhật thông tin cá nhân{" "}
        </Typography.Title>
            <Form
                className="updateAccountForm"
                layout="vertical"
                onFinish={handleFinish}
                form={updateForm}
            >
                {notifyContextHolder}

                <Form.Item>
                    <img
                        style={{ width: "10%", borderRadius: "100%" }}
                        src={avatar ?? currentUser?.user?.avatarImg}
                        alt="Avatar"
                    />
                    <UploadImage setImageUrl={setAvatar} />
                </Form.Item>

                <Form.Item
                    label="Họ và tên"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Họ và tên bắt buộc nhập",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input maxLength={100} value="123" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Email bắt buộc nhập" },
                        {
                            type: "email",
                            message: "Email không đúng định dạng",
                        },
                    ]}
                >
                    <Input maxLength={256} />
                </Form.Item>
                
                {/* <Form.Item
                    label="Giới tính"
                    name="gender"
                    rules={[
                        {
                            required: true,
                            message: "Giới tính bắt buộc nhập",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input maxLength={100} value="123" />
                </Form.Item> */}

                {/* <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Mật khẩu bắt buộc nhập",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input.Password maxLength={100} />
                </Form.Item> */}

                <Form.Item label="Mô tả bản thân" name="bio">
                    <Input.TextArea maxLength={500} />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: "100%", textAlign: "center" }}
                    >
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateAccountForm;
