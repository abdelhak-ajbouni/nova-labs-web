import React, { useState } from 'react'
import { navigate } from '@reach/router'
import { useMutation } from 'react-query'
import toast, { Toaster } from 'react-hot-toast';

import { addSeller } from 'libs/apis'

const Login = ({ }) => {
    const [username, setUsername] = useState('')
    const { mutate, isLoading } = useMutation(newSeller => addSeller(newSeller), {
        onSuccess: (data) => {
            const sellerId = data.data[0]._id
            setUsername('')
            navigate(`/home`, { state: { sellerId } })
            toast.success(`Welcome ${username}.`)
        },
        onError: () => {
            setUsername('')
            toast.error('Something Went Wrong.')
        }
    })

    return (
        <div className='login'>
            <div className='container ptb-70'>
                <h2> Login </h2>
                <input className="login-input input" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <button className='login-btn primary-btn' disabled={!username} onClick={() => mutate({fullName: username})}> { isLoading ? 'loading ...' : 'Login' } </button>
            </div>

            <Toaster
                position="bottom-center"
                reverseOrder={true}
            />
        </div>  
    )
}

export default Login;