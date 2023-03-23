import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "./Firebase";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.css";

function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleSubmission = () => {
        if (!values.email || !values.password) {
            setErrorMsg("Fill all fields");
            return;
        }


        setErrorMsg("");

        setSubmitButtonDisabled(true);
        signInWithEmailAndPassword(auth, values.email, values.password).then(async (res) => {
            setSubmitButtonDisabled(false);

            navigate('/')
        })

            .catch((err) => {
                setSubmitButtonDisabled(false);
                setErrorMsg(err.message);
            });
    };
    return (
        <div className="login-container">
            <div class="account section">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-6">
                            <div class="login-form border p-5">
                                <div class="text-center heading">
                                    <h2 class="mb-2">Login</h2>
                                    <p class="lead">Don’t have an account? <a href="/signup"> Create a free account</a></p>
                                </div>

                                <form action="#">
                                    <div class="form-group mb-4">
                                        <label htmlFor="#">Enter Email</label>
                                        <input type="text" class="form-control" placeholder="Enter Email" onChange={event => setValues(prev => ({ ...prev, email: event.target.value }))} />
                                    </div>
                                    <div class="form-group">
                                        <label htmlFor="#">Enter Password</label>
                                        <a class="float-right" href="/forgot-password">Forget password?</a>
                                        <input type="text" class="form-control" placeholder="Enter Password" onChange={event => setValues(prev => ({ ...prev, password: event.target.value }))} />
                                    </div>
                                    <b className={styles.error}>{errorMsg}</b>
                                    <a href="#" class="btn btn-main mt-3 btn-block" disalbled={submitButtonDisabled} onClick={handleSubmission}>Login</a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login