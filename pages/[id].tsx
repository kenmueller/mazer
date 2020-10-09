import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { toast } from 'react-toastify'

import { API_URL } from 'lib/constants'
import Game from 'models/Game'
import Cell from 'models/Cell'

const Room = () => {
	const router = useRouter()
	const id = router.query.id as string | undefined
	
	const canvas = useRef<HTMLCanvasElement | null>(null)
	const [cells, setCells] = useState<Cell[][] | null>(null)
	
	useEffect(() => {
		if (!id)
			return
		
		const controller = new AbortController()
		
		fetch(`${API_URL}/games/${id}`, { signal: controller.signal })
			.then(response => {
				if (response.status === 404) {
					toast.error('Invalid invite link')
					router.replace('/')
					
					return null
				}
				
				return response.json()
			})
			.then(setCells)
			.catch(error => {
				console.error('ERROR:', error)
				alert(error.message)
			})
		
		return () => controller.abort()
	}, [id, router])
	
	useEffect(() => {
		if (canvas.current && id && cells)
			return new Game(canvas.current, id, cells).start()
	}, [canvas, id, cells])
	
	return (
		<>
			<Head>
				<title key="title">Game Room - Mazer</title>
			</Head>
			<canvas width="500px" height="500px" ref={canvas} />
		</>
	)
}

export default Room
