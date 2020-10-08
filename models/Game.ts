import { API_URL } from 'lib/constants'
import IO from 'socket.io-client'

import Cell from './Cell'

const WALL_WIDTH = 10

export default class Game {
	private io: SocketIOClient.Socket
	private context: CanvasRenderingContext2D
	private rows: number
	private columns: number
	
	constructor(private canvas: HTMLCanvasElement, private cells: Cell[][]) {
		this.io = IO(API_URL)
		this.context = canvas.getContext('2d')
		this.rows = cells.length
		this.columns = cells[0].length
	}
	
	start = () => {
		this.context.fillStyle = 'black'
		
		for (let row = 0; row < this.rows; row++)
			for (let column = 0; column < this.columns; column++)
				this.drawCell(this.cells[row][column], row, column)
		
		return this.stop
	}
	
	stop = () => {
		
	}
	
	private drawCell = (cell: Cell, row: number, column: number) => {
		const width = (this.canvas.width - WALL_WIDTH) / this.columns
		const height = (this.canvas.height - WALL_WIDTH) / this.rows
		
		if (cell.up)
			this.context.fillRect(width * column, height * row, width + WALL_WIDTH, WALL_WIDTH)
		
		if (cell.right)
			this.context.fillRect(width * (column + 1), height * row, WALL_WIDTH, height + WALL_WIDTH)
		
		if (cell.down)
			this.context.fillRect(width * column, height * (row + 1), width + WALL_WIDTH, WALL_WIDTH)
		
		if (cell.left)
			this.context.fillRect(width * column, height * row, WALL_WIDTH, height + WALL_WIDTH)
	}
}
