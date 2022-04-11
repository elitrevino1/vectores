import React, { Component } from "react";
import { Container, Row, Col, Navbar, Form, Button, Tooltip, OverlayTrigger, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            magnitud: "",
            angulo: "",
            compx: "",
            compy: "",
            respuesta: false,
            unidadesa: "elige unidades",
            unidades: "",
        };
    }

    handleSubmit() {
        this.setState({ respuesta: true });
        if (this.state.compx && this.state.compy) {
            if (!this.state.magnitud) {
                let mag = Math.sqrt((this.state.compx ** 2) + (this.state.compy ** 2));
                this.setState({ magnitud: mag });
            }
            if (!this.state.angulo) {
                let ang = Math.atan(this.state.compy / this.state.compx);
                if(this.state.unidadesa == "°") ang = ang * 180/Math.PI;
                else this.setState({ unidadesa: "rad" });
                this.setState({ angulo: ang });
            }
            return;
        }
        if(this.state.magnitud && this.state.angulo){
            if(!this.state.compx){
                let ang = this.state.angulo;
                if(this.state.unidadesa == "°") ang = ang * Math.PI/180;
                else this.setState({ unidadesa: "rad" });
                let cx = this.state.magnitud * Math.cos(ang);
                this.setState({compx: cx});
            }
            if(!this.state.compy){
                let ang = this.state.angulo;
                if(this.state.unidadesa == "°") ang = ang * Math.PI/180;
                else this.setState({ unidadesa: "rad" });
                let cy = this.state.magnitud * Math.sin(ang);
                this.setState({compy: cy});
            }
            return;
        }
        if(this.state.angulo && this.state.compx){
            if(!this.state.magnitud){
                let ang = this.state.angulo;
                if(this.state.unidadesa == "°") ang = ang * Math.PI/180;
                else this.setState({ unidadesa: "rad" });
                let mag = this.state.compx / Math.cos(ang);
                this.setState({ magnitud: mag });
            }
            if(!this.state.compy){
                let ang = this.state.angulo;
                if(this.state.unidadesa == "°") ang = ang * Math.PI/180;
                else this.setState({ unidadesa: "rad" });
                let cy = this.state.compx * Math.tan(ang);
                this.setState({compy: cy});
            }
            return;
        }
        if(this.state.angulo && this.state.compy){
            if(!this.state.magnitud){
                let ang = this.state.angulo;
                if(this.state.unidadesa == "°") ang = ang * Math.PI/180;
                else this.setState({ unidadesa: "rad" });
                let mag = this.state.compy / Math.sin(ang);
                this.setState({ magnitud: mag });
            }
            if(!this.state.compx){
                let ang = this.state.angulo;
                if(this.state.unidadesa == "°") ang = ang * Math.PI/180;
                else this.setState({ unidadesa: "rad" });
                let cx = this.state.compy / Math.tan(ang);
                this.setState({compx: cx});
            }
            return;
        }
        if(this.state.magnitud && this.state.compx){
            if(!this.state.angulo){
                let ang = Math.acos(this.state.compx/this.state.magnitud);
                if(this.state.unidadesa == "°") ang = ang * 180/Math.PI;
                else this.setState({ unidadesa: "rad" });
                this.setState({ angulo: ang });
            }
            if(!this.state.compy){
                let cy = Math.sqrt((this.state.magnitud**2)-(this.state.compx**2));
                this.setState({compy: cy});
            }
            return;
        }
        if(this.state.magnitud && this.state.compy){
            if(!this.state.angulo){
                let ang = Math.asin(this.state.compy/this.state.magnitud);
                if(this.state.unidadesa == "°") ang = ang * 180/Math.PI;
                else this.setState({ unidadesa: "rad" });
                this.setState({ angulo: ang });
            }
            if(!this.state.compx){
                let cx = Math.sqrt((this.state.magnitud**2)-(this.state.compy**2));
                this.setState({compx: cx});
            }
            return;
        }
    }

    handleReset() {
        this.setState({ magnitud: "",
            angulo: "",
            compx: "",
            compy: "",
            respuesta: false,
            unidadesa: "elige unidades",
            unidades: "" });
    }

    handleEdit() {
        this.setState({ respuesta: false });
    }

    render() {
        return (
            <>
                <Navbar bg="info" sticky="top">
                    <Container>
                        <Navbar.Brand>
                            <p className="d-inline-block ml-2 m-0 text-white">
                                <span className="p-0">Proyecto Física</span>
                            </p>
                        </Navbar.Brand>
                        <Navbar.Brand>
                            <p className="d-inline-block ml-2 m-0 text-white">
                                <span className="p-0">Elizabeth Treviño, 554199</span>
                            </p>
                        </Navbar.Brand>
                    </Container>
                </Navbar>
                <Container className="mt-4 mb-5 pb-5">
                    <Row className="justify-content-center">
                        <Col xs={12} sm={12} md={8} lg={6} xl={5}>
                            <h2 className="text-center fw-bold">Calculadora de Vectores
                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 10, hide: 20 }}
                                    overlay={<Tooltip id="button-tooltip">
                                        Ingresa los datos que tengas para obtener el resto de los campos que faltan
                                    </Tooltip>}
                                >
                                    <i className="fa-solid fa-circle-question fa-2xs ms-3 text-secondary"></i>
                                </OverlayTrigger></h2>

                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form as={Container} onSubmit={(e) => e.preventDefault()}>
                                <Row className="justify-content-center">
                                    <Col xs={12} sm={12} md={8} lg={6} xl={5}>
                                        <Form.Group className="mt-3" controlId="magnitud">
                                            <Form.Label>Magnitud del vector</Form.Label>
                                            <InputGroup>
                                            <Form.Control type="number" placeholder="ej. 50" value={this.state.magnitud} onChange={(e) => this.setState({ magnitud: e.target.value })} disabled={this.state.respuesta} />
                                            <InputGroup.Text>{this.state.unidades}</InputGroup.Text>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col xs={12} sm={12} md={8} lg={6} xl={5}>
                                        <Form.Group className="mt-3" controlId="angulo">
                                            <Form.Label>Ángulo respecto al eje x positivo</Form.Label>
                                            <InputGroup>
                                            <Form.Control type="number" placeholder="ej. 30" value={this.state.angulo} onChange={(e) => this.setState({ angulo: e.target.value })} disabled={this.state.respuesta} />
                                            <DropdownButton
                                                variant="secondary"
                                                title={`${this.state.unidadesa}${" "}`}
                                                align="end"
                                                >
                                                <Dropdown.Item eventKey="deg" onClick={(e) => this.setState({ unidadesa: "°"})}>°</Dropdown.Item>
                                                <Dropdown.Item eventKey="rad" onClick={(e) => this.setState({ unidadesa: "rad"})}>rad</Dropdown.Item>
                                                </DropdownButton>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col xs={12} sm={12} md={8} lg={6} xl={5}>
                                        <Form.Group className="mt-3" controlId="compx">
                                            <Form.Label>Componente en x</Form.Label>
                                            <InputGroup>
                                            <Form.Control type="number" placeholder="ej. 10" value={this.state.compx} onChange={(e) => this.setState({ compx: e.target.value })} disabled={this.state.respuesta} />
                                            <InputGroup.Text>{this.state.unidades}</InputGroup.Text>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col xs={12} sm={12} md={8} lg={6} xl={5}>
                                        <Form.Group className="mt-3" controlId="compy">
                                            <Form.Label>Componente en y</Form.Label>
                                            <InputGroup>
                                            <Form.Control type="number" placeholder="ej. 30" value={this.state.compy} onChange={(e) => this.setState({ compy: e.target.value })} disabled={this.state.respuesta} />
                                            <InputGroup.Text>{this.state.unidades}</InputGroup.Text>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col xs={12} sm={12} md={8} lg={6} xl={5}>
                                        <Form.Group className="mt-3" controlId="unidades">
                                            <Form.Label>Unidades</Form.Label>
                                            <Form.Control type="text" placeholder="ej. m/s" value={this.state.unidades} onChange={(e) => this.setState({ unidades: e.target.value })} disabled={this.state.respuesta} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col xs={12} sm={12} md={8} lg={6} xl={5} className="mt-3">
                                        <Button variant={this.state.respuesta ? "secondary" : "info"} type="submit" className="me-2 text-white" disabled={this.state.respuesta} onClick={() => this.handleSubmit()}>
                                            Calcular campos faltantes
                                        </Button>
                                        {this.state.respuesta &&
                                            <Button variant="info" className="me-2" type="submit" onClick={() => this.handleEdit()}>
                                                Editar
                                            </Button>
                                        }
                                        {this.state.respuesta &&
                                            <Button variant="danger" className="me-2" type="submit" onClick={() => this.handleReset()}>
                                                Limpiar
                                            </Button>
                                        }
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default Home;