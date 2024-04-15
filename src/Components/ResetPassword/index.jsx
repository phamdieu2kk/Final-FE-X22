/*eslint-disable*/
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Form, Input, Typography } from "antd";
import { useContext } from 'react';
import NotificationContext from "../../context/NotificationContext";
import api from "../../api";

const ResetPassword = () => {
    const [resetpasswordForm] = Form.useForm();
    const navigate = useNavigate();
    const { notify } = useContext(NotificationContext);
    const [searchParams] = useSearchParams();

    const handleResetPasswordForm = async (values) => {
        try {
            const token = searchParams.get("token");
            const response = await api.postResetpassword.invoke({
                data: { password: values.password, token }
            });
            const data = response.data;

            notify.success({
                message: 'Thành công',
                description: 'Đặt lại mật khẩu thành công',
            });
           
            navigate("/login");
        } catch (error) {
            console.error("Lỗi khi đặt lại mật khẩu:", error);
            notify.error({
                message: 'Thất bại',
                description: 'Đặt lại mật khẩu thất bại'
            });
        }
    };

    return (
        <div className="auth-page">
            <Form form={resetpasswordForm} onFinish={handleResetPasswordForm} className="auth-form">
                <Typography.Title style={{ textAlign: "center" }}>Đặt lại mật khẩu </Typography.Title>
                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                        { required: true, message: 'Mật khẩu bắt buộc nhập', whitespace: true },
                    ]}
                >
                    <Input.Password maxLength={100} />
                </Form.Item>

                <Form.Item
                    label="Xác nhận mật khẩu"
                    name="passwordConfirmation"
                    rules={[
                        { required: true, message: 'Xác nhận mật khẩu bắt buộc nhập', whitespace: true },
                        ({ getFieldValue }) => ({ validator: (rule, value) => value !== getFieldValue('password') ? Promise.reject('Xác nhận mật khẩu không chính xác') : Promise.resolve() })

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