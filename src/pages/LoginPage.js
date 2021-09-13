/* eslint-disable jsx-a11y/anchor-is-valid */
import { Col, Row, Form, Input, Button, Space, notification } from "antd";
import { Fragment, useEffect } from "react";
import image_login_back from "../assets/images/login_back.jpg";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import Center from "../components/Center";
import { Link, useHistory } from "react-router-dom";
import { signWithEmailAndPassword, auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "../components/Loader";
//
function LoginPage() {
  const history = useHistory();
  const [user, loading] = useAuthState(auth);
  //
  useEffect(() => {
    if (user && !loading) {
      history.push("/");
    }
  }, [user, loading, history]);
  //
  const onFormSubmit = (v) => {
    signWithEmailAndPassword(v.email, v.password)
      .then((_) => {
        notification.open({
          style: { background: "#52c41a", color: "#ffffff" },
          message: "Login was successful!",
          description: "Welcome " + v.email.split("@")[0] + " to our website!",
        });
      })
      .catch((e) => {
        notification.open({
          style: { background: "#f5222d", color: "#ffffff" },
          message: "Login was failed!",
          description: String(e),
        });
      });
  };
  //
  return (
    <Fragment>
      <Loader loading={loading}>
        <Row style={{ height: "100%" }}>
          <Col style={{ padding: "20px 24px" }} span={8}>
            <Row style={{ height: "10%" }}>
              <Col span={6}>
                <b>Your Logo Here</b>
              </Col>
              <Col span={18} />
            </Row>
            <Row style={{ height: "80%" }}>
              <Center>
                <Form
                  name="normal_login"
                  className="login-form"
                  style={{ width: "60%" }}
                  onFinish={onFormSubmit}
                >
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Username!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined className="site-form-item-icon" />}
                      placeholder="Email"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      Sign in
                    </Button>
                    {"  "} Or{" "}
                    <Link className="login-form-forgot" to="/register">
                      Register now!
                    </Link>
                  </Form.Item>
                </Form>
              </Center>
            </Row>
            <Row
              style={{ height: "10%", display: "flex", alignItems: "flex-end" }}
            >
              <Col span={14}>Login With</Col>
              <Col span={10}>
                <Space>
                  <a href="#">Google</a>
                  <a href="#">Facebook</a>
                  <a href="#">Tweeter</a>
                  <a href="#">Github</a>
                </Space>
              </Col>
            </Row>
          </Col>
          <Col style={{ height: "100%" }} span={16}>
            <img
              src={image_login_back}
              alt="login beautiful"
              style={{ height: "100%", width: "100%" }}
            />
          </Col>
        </Row>
        )
      </Loader>
    </Fragment>
  );
}

export default LoginPage;
