import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import styles from "./Signup.css";
import { auth } from "./Firebase";
import { useNavigate } from "react-router-dom";


function SignUp() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleSubmission = () => {
        if (!values.name || !values.email || !values.password) {
            setErrorMsg("Fill all fields");
            return;
        }


        setErrorMsg("");

        setSubmitButtonDisabled(true);
        createUserWithEmailAndPassword(auth, values.email, values.password).then(async (res) => {
            setSubmitButtonDisabled(false);
            const user = res.user;
            await updateProfile(user, {
                diplayName: values.name,
            });
            navigate('/')
        })

            .catch((err) => {
                setSubmitButtonDisabled(false);
                setErrorMsg(err.message);
            });
    };
    return (
        <div className="signUp-container">
            <div class="account section">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-6">
                            <div class="login-form border p-5">
                                <div class="text-center heading">
                                    <h2 class="mb-2">Sign Up</h2>
                                    <p class="lead">Already have an account? <a href="/login"> Login now</a></p>
                                </div>

                                <form action="#">
                                    <div class="form-group mb-4">
                                        <label htmlFor="#">Enter Email Address</label>
                                        <input type="text" class="form-control" placeholder="Enter Email Address"
                                            onChange={(event) =>
                                                setValues((prev) => ({ ...prev, email: event.target.value }))
                                            } />
                                    </div>
                                    <div class="form-group mb-4">
                                        <label htmlFor="#">Enter username</label>
                                        <a class="float-right" href="/forgot-password">Forget password?</a>
                                        <input type="text" class="form-control" placeholder="Enter Password"
                                            onChange={(event) =>
                                                setValues((prev) => ({ ...prev, name: event.target.value }))
                                            } />
                                    </div>
                                    <div class="form-group mb-4">
                                        <label htmlFor="#">Enter Password</label>
                                        <input type="text" class="form-control" placeholder="Enter Password"
                                            onChange={(event) =>
                                                setValues((prev) => ({ ...prev, password: event.target.value }))
                                            } />
                                    </div>
                                    {/* <div class="form-group">
                            <label for="#">Confirm Password</label>
                            <input type="text" class="form-control" placeholder="Confirm Password"
                                onChange={(event) =>
                                    setValues((prev) => ({...prev, name :event.target.value }))
                            }/> 
                        </div> */}
                                    <b className={styles.error}>{errorMsg}</b>

                                    <a href="#" class="btn btn-main mt-3 btn-block" onClick={handleSubmission} disabled={submitButtonDisabled}>Signup</a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignUp