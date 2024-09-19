import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./login.css";
import logoW from "../../Assets/logoW.svg";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import MediaQuery from "react-responsive";
import { get, ref } from "firebase/database";
import { database } from "../../firebase";
import { Hash } from "../../hasher";
import Cookies from "js-cookie";

export default function Login() {
  const [eye, setEye] = useState(false);
  const [name,setName] = useState('');
  const [pass,setPass] = useState('');
  const ClickEye = () => {
    setEye(!eye);
  };

  function login()
  {
    if(name&&pass){
      const reference = ref(database,'admins/'+name);
      let hashPass = Hash(pass);
      get(reference).then((snapshot)=>{
        if(snapshot.exists()){
          if(snapshot.val().password === hashPass){
            if(snapshot.val().admin==='sadmin'){
              Cookies.set('name',name,{ expires: 1 });
              Cookies.set('tokkenSign','kW9BSmL7YZxyOw70h2MaPEdfFvQ52bSC68dwXT8p7OrQBPJXCF8RGq2hMgtsBuzG',{ expires: 1 });
              window.location.href = '/';
            }
            else{
              Cookies.set('name',name,{ expires: 1 });
              Cookies.set('tokkenSign','f5Z89Y7P3zfYdfKiZw8tctWarCsYCtDjLbCItSwt1FBZLqhMJH2UG2gxR7iWbd7Z',{ expires: 1 });
              window.location.href = '/';
            }
          }
          else{
            alert('Incorrect Password')
          }
        }
        else{
          alert('Incorrect Username or Password')
        }
      })
    }
    else{
      alert('fill all fields')
    }
  }


  return (
    <div>
      <MediaQuery minWidth={1024}>
        <Container fluid>
          <Row>
            <Col style={{ display: "flex" }}>
              <div className="picLeft">
                <Row>
                  <Col style={{ textAlign: "center", paddingTop: "10%" }}>
                    <h1 className="headLog">Welcome!</h1>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ textAlign: "center", color: "white" }}>
                    <h2>Login to your Account</h2>
                  </Col>
                </Row>
                <Row>
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "5%",
                    }}
                  >
                    <div class="mb-3 inp-fields">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="User Name"
                        onChange={(e)=>{setName(e.target.value)}}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ display: "flex", justifyContent: "center" }}>
                    <div class="inp-fields">
                      <input
                        type={eye ? "text" : "password"}
                        class="form-control field-pass"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="button-addon2"
                        onChange={(e)=>{setPass(e.target.value)}}
                      />
                      <button
                        onClick={ClickEye}
                        class="btn btn-outline-secondary butt-fields"
                        type="button"
                        id="button-addon2"
                      >
                        {eye ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ display: "flex", justifyContent: "center",paddingTop:50}}>
                    <button className="buttonLog" onClick={login}>LOGIN</button>
                  </Col>
                </Row>
              </div>
              <div className="panel1">
                <Row>
                  <Col style={{ textAlign: "center", paddingTop: "45%" }}>
                    <img src={logoW} alt={logoW} width={250} />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </MediaQuery>
      <MediaQuery maxWidth={1023}>
        <Container fluid>
          <div className="panelMob">
            <Row>
              <Col style={{ textAlign: "center", paddingTop: "10%" }}>
                <h1 className="headLogM">Welcome!</h1>
              </Col>
            </Row>
            <Row>
              <Col style={{ textAlign: "center", color: "white" }}>
                <h6>Login to your Account</h6>
              </Col>
            </Row>
            <Row>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "5%",
                }}
              >
                <div class="mb-3 inp-fields-m">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="User Name"
                    onChange={(e)=>{setName(e.target.value)}}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col style={{ display: "flex", justifyContent: "center" }}>
                <div class="inp-fields-m">
                  <input
                    type={eye ? "text" : "password"}
                    class="form-control field-pass"
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="button-addon2"
                    onChange={(e)=>{setPass(e.target.value)}}
                  />
                  <button
                    onClick={ClickEye}
                    class="btn btn-outline-secondary butt-fields"
                    type="button"
                    id="button-addon2"
                  >
                    {eye ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col style={{ display: "flex", justifyContent: "center",paddingTop:50 }}>
                <button className="buttonLog" onClick={login}>LOGIN</button>
              </Col>
            </Row>
          </div>
        </Container>
      </MediaQuery>
    </div>
  );
}
