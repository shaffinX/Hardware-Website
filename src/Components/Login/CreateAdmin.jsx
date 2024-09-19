import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./login.css";
import logoW from "../../Assets/logoW.svg";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import MediaQuery from "react-responsive";
import {set,ref, get} from 'firebase/database';
import {database} from '../../firebase'

import {Hash} from '../../hasher';
import { useNavigate } from "react-router-dom";
function CreateAdmin() {
    const [eye, setEye] = useState(false);
    const [name,setName] = useState('');
    const [pass,setPass] = useState('');
    const [mail,setMail] = useState('');
    const nav = useNavigate();
    const ClickEye = () => {
      setEye(!eye);
    };

    async function create()
    {
      if(name&&pass){
        let hashedPass = Hash(pass);
        const reference = ref(database,'admins/' + name);
        get(reference).then((snapshot)=>{
          if(snapshot.exists()){
            alert('Failed! Admin already exists.');
          }
          else{
            set(reference,{
              name:name,
              password:hashedPass,
              email:mail,
              admin:'admin'
            }).then(()=>{
              alert('admin Created Successfully!');
              nav('/Settings');
            })
            .catch((err)=>{console.log(err);})
          }
        })
      }
      else{
        alert('Enter all the fields');
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
                    <h2>Create an Admin Account</h2>
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
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div class="mb-3 inp-fields">
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Email"
                        onChange={(e)=>{setMail(e.target.value)}}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ display: "flex", justifyContent: "center" }}>
                    <div class="input-group mb-3 inp-fields">
                      <input
                        type={eye ? "text" : "password"}
                        class="form-control"
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
                  <Col style={{ display: "flex", justifyContent: "center" }}>
                    <button className="buttonLog" onClick={create}>CREATE</button>
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
                <h6>Create an Admin Account</h6>
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
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div class="mb-3 inp-fields-m">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Email"
                    onChange={(e)=>{setMail(e.target.value)}}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col style={{ display: "flex", justifyContent: "center" }}>
                <div class="input-group mb-3 inp-fields-m">
                  <input
                    type={eye ? "text" : "password"}
                    class="form-control"
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
              <Col style={{ display: "flex", justifyContent: "center" }}>
                <button className="buttonLog">CREATE</button>
              </Col>
            </Row>
          </div>
        </Container>
      </MediaQuery>
    </div>
  )
}

export default CreateAdmin
