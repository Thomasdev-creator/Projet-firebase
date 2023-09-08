import React, {useContext, useRef, useState} from "react"
import {UserContext} from "../context/userContext"

export default function SignUpModal() {

    const {modalState, toggleModals, signUp} = useContext(UserContext)

    console.log(signUp);

    const [validation, setValidation] = useState("");

    const inputs = useRef([])
    const addInputs = el => {
        if(el && !inputs.current.includes(el)) {
            inputs.current.push(el)
        }
    }

    const formRef = useRef();

    const handleForm = async e => {
        e.preventDefault()
        
        if((inputs.current[1].value.length || inputs.current[2].value.length) < 6) {
            setValidation("6 characters minimum")
            return;
        } else if(inputs.current[1].value !== inputs.current[2].value){
            setValidation("Passwords do not match")
            return;
        }

        try {
            const cred = await signUp(
                inputs.current[0].value,
                inputs.current[1].value
            )
            formRef.current.reset();
            setValidation("")
            console.log(cred)
            
        } catch(err) {

        }
    }


  return (
    <>
    {modalState.signUpModal && (
    <div className="position-fixed top-0 vw-100 vh-100">
        <div 
        onClick={() => toggleModals("close")}
        className="w-100 h-100 bg-dark bg-opacity-75">
        </div>

            <div 
            className="position-absolute top-50 start-50 translate-middle"
            style={{ minWidth: "400px" }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Sign up</h5>
                            <button 
                            onClick={() => toggleModals("close")}
                            className="btn-close"></button>
                        </div>

                        <div className="modal-body">
                            <form
                            ref={formRef}
                            onSubmit={handleForm}
                            className="sign-up-form">
                                <div className="mb-3">
                                    <label htmlFor="signUpEmail" className="form-label">Email adress</label>
                                    <input ref={addInputs} type="email" className="form-control" name="email" required id="signUpEmail" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="signUpPwd" className="form-label">Password</label>
                                    <input  ref={addInputs} type="password" className="form-control" name="pwd" required id="signUpPwd" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="repeatPwd" className="form-label">Repeat password</label>
                                    <input ref={addInputs} type="password" className="form-control" name="pwd" required id="repeatPwd "/>
                                    <p className="text-danger mt-1">{validation}</p>
                                </div>

                                <button className="btn btn-primary">Submit</button>
                        
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}
    </>
  );

}