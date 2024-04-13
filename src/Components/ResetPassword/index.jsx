/*eslint-disable*/
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Form, Input, Typography, notification } from "antd";
import { useContext, useState } from 'react';
import axios from "axios";
import NotificationContext from "../../context/NotificationContext";
import api from "../../api";
const ResetPassword = () => {
    const [resetpasswordForm] = Form.useForm();
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setpasswordConfirmation] = useState("");
    const navigate = useNavigate();

    const { notify } = useContext(NotificationContext);

    const [searchParams, setSearchParams] = useSearchParams()
    const handleResetPasswordForm = async (values) => {
        try {
            
            const token = searchParams.get("token")
            const response = await api.postResetpassword.invoke({
               data: {password, token}
            });
            const data = response.data;

            notify.success({
                message: 'Thành công',
                description: 'Đặt lại mật khẩu thành công',
            });
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.message ?? error.response?.data);
            notify.error({
                message: 'Thất bại',
                description: 'Đặt lại mật khẩu thất bại'
            });
        }
    };

    return (
        <div className="auth-page">
            <Form form={resetpasswordForm} onFinish={handleResetPasswordForm} className="auth-form">
                <Typography.Title style={{ textAlign: "center", fontFamily: "Playball" }}>Đặt lại mật khẩu </Typography.Title>
                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    rules={[
                        { required: true, message: 'Mật khẩu bắt buộc nhập', whitespace: true },
                    ]}
                >
                    <Input.Password maxLength={100} />
                </Form.Item>

                <Form.Item
                    label="Xác nhận mật khẩu"
                    name="passwordConfirmation"
                    onChange={(e) => setpasswordConfirmation(e.target.value)}
                    rules={[
                        { required: true, message: 'Xác nhận mật khẩu bắt buộc nhập', whitespace: true },
                        ({ getFieldValue }) => ({ validator: (rule, value) => value !== getFieldValue('password') ? Promise.reject('Xác nhận mật khẩu chính xác') : Promise.resolve() })

                    ]}
                >
                    <Input.Password maxLength={100} />
                </Form.Item>

                <Button type="primary" htmlType="submit" className="auth-button" style={{ width: '100%' }}>Đặt lại mật khẩu</Button>
            </Form>
        </div>


    );
};

export default ResetPassword;