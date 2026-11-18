import {useState} from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        
        const response = await fetch(
            "http://localhost:5001/api/auth/login", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    email, 
                    password 
                })
            }
        );

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem(
                "token", 
                data.token
            );
            localStorage.setItem(
                "user", 
                JSON.stringify(data.user)
            );
            window.location.href = "/";
        } else {
            alert(data.message);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;