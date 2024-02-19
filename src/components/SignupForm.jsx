import { useState } from "react";

export default function SignupForm({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            e.preventDefault();
            const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                })
            const result = await response.json();
            setToken(result.token);
            console.log(result);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
            <h2>Sign Up</h2>
            {error && <p>{error}</p>}

            <form onSubmit={(e) => handleSubmit(e)}>
                <input required className="input" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                <input required className="input" type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                <button className="signup-button">Submit</button>
            </form>

        </>
    );
}