import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Typography, notification } from "antd";
import { useState } from "react";
import axios from "axios";

const Forgotpassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleForgotpasswordForm = async () => {
        try {
            const response = await axios.post(
                "http://20.198.217.162:3000/api/v1/user/forgotpassword",
                { email }
            );

            const data = response.data;
            notification.success({ message: data?.message });
           // Ẩn thông báo thành công sau 2 giây

      
            navigate("/reset-password");
        } catch (error) {
            const errorMessage = error.response?.data?.message ?? error.response?.data;
            notification.error({ message: errorMessage });
        }
    };

    return (
        <div className="auth-page">
            <Form className="auth-form">
                <Typography.Title style={{ textAlign: "center"}}>Quên mật khẩu</Typography.Title>
                <Form.Item
                    label="Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    rules={[
                        { required: true, message: 'Email bắt buộc nhập' },
                        { type: "email", message: 'Email không đúng đúng định dạng' },
                    ]}
                >
                    <Input maxLength={256} />
                </Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="auth-button"
                    style={{ width: '100%' }}
                    onClick={handleForgotpasswordForm}
                >
                    Lấy lại mật khẩu
                </Button>
            </Form>
        </div>
    );
};

export default Forgotpassword;