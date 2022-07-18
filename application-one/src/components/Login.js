import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Login(props) {
    const [email, setmail] = useState('');
    const [password, setPassword] = useState('');
    const handleClick = () => {
        props.emitData({email, password});
    }

    const onEmailChange = (e) => {
        setmail(e.target.value);
    }
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const styles = {
        marginTop: {
            marginTop: 20
        },
        box: {
            border: 'solid 1px gray',
            padding: 10
        }
    }
    return (
        <div className='container'>
            <h3>Login Page (From Application One)</h3>
            <Form style={styles.box}>

                <Form.Group classemail="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={onEmailChange} />
                    <Form.Text classemail="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group classemail="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={onPasswordChange} />
                </Form.Group>
                <Button style={styles.marginTop} variant="primary" onClick={handleClick}>
                    Submit
                </Button>
            </Form>
        </div>

    )
}
