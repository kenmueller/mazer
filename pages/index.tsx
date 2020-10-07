import { useState, useCallback, FormEvent, ChangeEvent } from 'react'
import Router from 'next/router'
import Head from 'next/head'

import { API_URL } from 'lib/constants'

const Home = () => {
	const [width, setWidth] = useState(10)
	const [height, setHeight] = useState(10)
	
	const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		
		try {
			const response = await fetch(`${API_URL}/games`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ rows: height, columns: width })
			})
			
			Router.push('/[id]', `/${await response.text()}`)
		} catch (error) {
			console.error(error)
			alert(error.message)
		}
	}, [width, height])
	
	const onWidthInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setWidth(parseInt(event.target.value, 10))
	}, [setWidth])
	
	const onHeightInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setHeight(parseInt(event.target.value, 10))
	}, [setHeight])
	
	return (
		<>
			<Head>
				<title key="title">Mazer</title>
			</Head>
			<form onSubmit={onSubmit}>
				<input type="number" value={width} onChange={onWidthInputChange} />
				<input type="number" value={height} onChange={onHeightInputChange} />
				<button>Create game</button>
			</form>
		</>
	)
}

export default Home
