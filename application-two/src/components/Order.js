import React, { Suspense, useState } from 'react'
const Login = React.lazy(() => import('applicationone/Login'))

export default function Order() {
    const [loginData, setLoginData] = useState(null);
    const receivedDataFromLogin = (value) => {
        setLoginData(value)
    }
    return (
        <div>Order Component of application-two
            <Suspense fallback={<div>Something went wrong..</div>}>
                <Login emitData={receivedDataFromLogin}></Login>
            </Suspense>
            <div>
               {
                    loginData ?
                    <div style={{marginTop: 10}}>
                        <div>You have entered below details (Fetching from Login Component - Application One)</div>
                        <div>Your Email: {loginData.email}</div>
                       <div> Your Password: {loginData.password}</div>
                    </div>
                    :
                    ''
               }
            </div>
        </div>

    )
}
