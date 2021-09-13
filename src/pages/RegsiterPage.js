/* eslint-disable jsx-a11y/anchor-is-valid */
import { Col, Row, Form, Input, Button, Space, notification } from "antd";
import { Fragment, useEffect } from "react";
import image_register_back from "../assets/images/register_back.jpg";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import Center from "../components/Center";
import { Link, useHistory } from "react-router-dom";
import { auth, createUser } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "../components/Loader";
import { updateProfile } from "@firebase/auth";
//
let initialState = false;
//
function RegisterPage() {
  const history = useHistory();
  const [user, loading] = useAuthState(auth);
  //
  useEffect(() => {
    if (user && !loading && !initialState) {
      history.push("/");
    } else initialState = true;
  }, [user, loading, history]);
  //
  const onFormSubmit = (v) => {
    createUser(v.email, v.password)
      .then((_) => {
        updateProfile(auth.currentUser, {
          displayName: v.username,
        })
          .then((_) => {
            notification.open({
              style: { background: "#52c41a", color: "#ffffff" },
              message: "Register was successful!",
              description: "Welcome " + v.username + " to our website!",
            });
            history.push("/");
          })
          .catch((e) => {
            console.log(String(e));
            notification.open({
              style: { background: "#f5222d", color: "#ffffff" },
              message: "Register was failed!",
              description: String(e),
            });
          });
      })
      .catch((e) => {
        console.log(String(e));
        notification.open({
          style: { background: "#f5222d", color: "#ffffff" },
          message: "Register was failed!",
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
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Username!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Username"
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Please input your Email!" },
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
                      Sign up
                    </Button>
                    {"  "} Or{" "}
                    <Link className="login-form-forgot" to="/login">
                      Login now!
                    </Link>
                  </Form.Item>
                </Form>
              </Center>
            </Row>
            <Row
              style={{ height: "10%", display: "flex", alignItems: "flex-end" }}
            >
              <Col span={14}>Register With</Col>
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
              src={image_register_back}
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

export default RegisterPage;
