
import { useState } from "react";
import api from "./api";

function AuthModal({ onClose, onLogin }) {
    const [mode, setMode] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            const endpoint =
                mode === "login" ? "/auth/login" : "/auth/register";

            const payload =
                mode === "login"
                    ? { email, password }
                    : { name, email, password };

            const response = await api.post(endpoint, payload);
            const { token, user } = response.data;

            if (!token || !user) {
                throw new Error("The server did not return a token and user.");
            }

            onLogin({ token, user });
            onClose();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <section
                className="auth-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="auth-title"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    className="modal-close"
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ×
                </button>

                <div className="auth-logo">S</div>

                <h2 id="auth-title">
                    {mode === "login" ? "Welcome back" : "Create your account"}
                </h2>

                <p className="auth-subtitle">
                    {mode === "login"
                        ? "Log in to manage your favorite templates."
                        : "Join StackStore and save templates you love."}
                </p>

                <form onSubmit={handleSubmit}>
                    {mode === "register" && (
                        <label className="auth-field">
                            Full name
                            <input
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Your name"
                                autoComplete="name"
                                required
                                maxLength={80}
                            />
                        </label>
                    )}

                    <label className="auth-field">
                        Email address
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                        />
                    </label>

                    <label className="auth-field">
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Enter your password"
                            autoComplete={
                                mode === "login" ? "current-password" : "new-password"
                            }
                            minLength={8}
                            required
                        />
                    </label>

                    {error && <p className="auth-error">{error}</p>}

                    <button className="auth-submit" type="submit" disabled={loading}>
                        {loading
                            ? "Please wait..."
                            : mode === "login"
                                ? "Log in"
                                : "Create account"}
                    </button>
                </form>

                <p className="auth-switch">
                    {mode === "login"
                        ? "Don't have an account?"
                        : "Already have an account?"}{" "}
                    <button
                        type="button"
                        onClick={() => {
                            setMode(mode === "login" ? "register" : "login");
                            setError("");
                        }}
                    >
                        {mode === "login" ? "Sign up" : "Log in"}
                    </button>
                </p>
            </section>
        </div>
    );
}

export default AuthModal;
