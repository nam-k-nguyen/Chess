import { useState } from 'react';
import Cell from './Cell';
import { useSocket } from '../context/SocketContext';
import { getPossibleMoves, getSessionID, toggleCellClass, toggleMultipleCellClass } from '../util';

export default function Board() {
	const { socket, boardArray } = useSocket()
	const [prevIndex, setPrevIndex] = useState(null)
	const DARK_CELL = '#B58763'
	const LIGHT_CELL = '#F0DAB5'
	const DARK_PIECE = '#1e1e1f'
	const LIGHT_PIECE = '#ffffff'

	function toggleHighlight(index) {
		// const piece = boardArray[index].piece
		const row = boardArray[index].row
		const col = boardArray[index].col
		socket.emit('get_possible_moves', {board: boardArray, index: index}, (possible_moves) => {
			toggleMultipleCellClass(possible_moves, 'move_cell')
			toggleCellClass(row, col, 'active_cell')
		})
	}

	function handleCellClick(e) {
		let cell = e.currentTarget;
		const currIndex = cell.dataset.index
		const cellHasPiece = cell.dataset.piece !== 'none'
		if (prevIndex) {
			const data = { move: { src: prevIndex, dest: currIndex }, session_id: getSessionID() }
			socket.emit('verify_move', data, res => { console.log(res) })
			toggleHighlight(prevIndex)
			setPrevIndex(null)
		}
		else if (cellHasPiece) {
			toggleHighlight(currIndex)
			setPrevIndex(currIndex)
		}
	}

	return (
		<div className='board_container'>
			{boardArray.map((cell, i) => {
				return <Cell
					key={i}
					index={cell.index}
					row={cell.row}
					col={cell.col}
					coordinate={cell.coordinate}
					piece={cell.piece}
					pieceColor={cell.pieceColor === 'white' ? LIGHT_PIECE : DARK_PIECE}
					cellColor={cell.cellColor === 'white' ? LIGHT_CELL : DARK_CELL}
					handleCellClick={handleCellClick}
				/>
			})}
		</div>
	)
}
