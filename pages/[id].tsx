import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { API_URL } from 'lib/constants'
import Cell from 'models/Cell'

const Room = () => {
	const id = useRouter().query.id as string
	
	const [cells, setCells] = useState<Cell[][] | null>(null)
	
	useEffect(() => {
		if (!id)
			return
		
		fetch(`${API_URL}/games/${id}`)
			.then(response => response.json())
			.then(setCells)
			.catch(error => {
				console.error(error)
				alert(error.message)
			})
	}, [id])
	
	return (
		<>
			<Head>
				<title key="title">Game Room - Mazer</title>
			</Head>
			{cells?.map((cell, i) => <p key={i}>{JSON.stringify(cell)}</p>)}
		</>
	)
}

export default Room
