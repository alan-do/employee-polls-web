import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { handleLogin } from "../../redux/actions/authAction";
import { Dropdown, Button } from "antd";
import "./Login.css";

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const usersList = useSelector((state) => state.users);
    const [selectedUser, setSelectedUser] = useState("");
    const [password, setPassword] = useState("");
    const isAuthenticated = useSelector((state) => state.authenticatedUser);
    useEffect(() => {
        if (isAuthenticated) {
            const urlParams = new URLSearchParams(window.location.search);
            const redirectUrl = urlParams.get('redirectTo');
            navigate(redirectUrl || "/");
        }
    }, [isAuthenticated, navigate]);

    const onLogin = () => {
        const user = usersList[selectedUser];
        dispatch(handleLogin(user));
    };

    const items =
        usersList && Object.keys(usersList).length > 0
            ? Object.values(usersList).map((user) => ({
                key: user.id,
                label: user.name,
                avatar: user.avatarURL,
            }))
            : [{ key: "loading", label: "Loading..." }];

    const handleMenuClick = (e) => {
        setSelectedUser(e.key);
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Login</h1>
            <img className="app-logo" src="/assets/poll.png" alt="logo" />
            <Dropdown.Button
                className="dropdown-button"
                menu={{
                    items,
                    onClick: handleMenuClick,
                }}
                placement="bottom"
                icon={<UserOutlined />}
            >
                {selectedUser ? usersList[selectedUser].name : "Select User"}
            </Dropdown.Button>
            <Button type="primary" onClick={onLogin} disabled={!selectedUser}>Login</Button>
        </div>
    );
}

export default Login;
