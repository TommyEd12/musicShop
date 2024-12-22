import React from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import "./Auth.css";
import { observer } from "mobx-react-lite";

const AuthPage: React.FC = observer(() => {
  return (
    <div className="authCardWrapper">
      <div className="authCard card w-100" style={{ maxWidth: "400px" }}>
        <div className="card-header">
          <h2 className="card-title h5 mb-0">
            <br></br>
          </h2>
        </div>
        <div className="card-body">
          <AuthForm />
        </div>
      </div>
    </div>
  );
});

export default AuthPage;
