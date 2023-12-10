import React from 'react'
import Login from './Login'
import Register from './Register';
const page = () => {
	return (
		<div className='flex justify-center items-center gap-8'>
			<Login />
			<Register />
		</div>
	)
}

export default page