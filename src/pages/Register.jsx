import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Button, Checkbox, Form, Input, Typography, notification } from "antd";
import api from "../api";

export default function Register() {
    const [registerForm] = Form.useForm();
    const navigate = useNavigate();

    const handleRegisterForm = async (values) => {
        console.log('Giá trị nhập vào ', values);

        const dto = {
            name: values.fullName.trim(),
            email: values.email,
            username: values.username,
            password: values.password.trim(),
        };

        try {
            await api.register.invoke({ data: dto });
            notification.success({
                message: 'Thành công',
                description: 'Đăng ký tài khoản thành công'
            });
            navigate('/login');
        } catch (error) {
            console.dir(error);
            notification.error({
                message: 'Thất bại',
                description: 'Đăng ký tài khoản thất bại'
            });
        }
    }

    return (
        <div className="auth-page">
            <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Col xs={24} sm={20} md={16} lg={12} xl={8}>
                    <Form
                        form={registerForm}
                        onFinish={handleRegisterForm}
                        className="auth-form"
                        layout="vertical"
                    >
                        <Typography.Title style={{ textAlign: "center"}}>Đăng Kí Tài Khoản</Typography.Title>

                        <Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[
                    { required: true, message: 'Họ và tên bắt buộc nhập', whitespace: true },
                ]}
            >
                <Input maxLength={100} />
            </Form.Item>

            <Form.Item
                label="Tên đăng nhập"
                name="username"
                rules={[
                    { required: true, message: 'Tên đăng ký bắt buộc nhập', whitespace: true },
                    { validator: (rule, value) => (!value?.trim() || !value.includes(' ')) ? Promise.resolve() : Promise.reject('Tên đăng ký không được chứa dấu cách') }
                ]}
            >
                <Input maxLength={100} />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Email bắt buộc nhập' },
                    { type: "email", message: 'Email không đúng đúng định dạng' },
                ]}
            >
                <Input maxLength={256} />
            </Form.Item>

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
                    { validator: (rule, value) => value != registerForm.getFieldValue('password') ? Promise.reject('Xác nhận mật khẩu không chính xác') : Promise.resolve()}]}>
                        <Input.Password maxLength={100} />
                        </Form.Item>
                         <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Tôi đồng ý  <a href="/instruction"> Điều khoản và điều kiện</a></Checkbox>
                            </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="auth-button">Đăng ký</Button>
                            <div className="member"> Bạn đã có tài khoản{" "}<Link to="/login"> Đăng nhập </Link> tại đây ?</div>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}