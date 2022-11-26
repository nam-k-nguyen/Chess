import { useState } from 'react';
import Cell from './Cell';
import { useSocket } from '../context/SocketContext';
import { 
	getSessionID, 
	clearAllHighlight,
	addCellClass,
	addCellsClass,
} from '../util';

export default function Board() {
	const { socket, boardArray } = useSocket()
	const [prevIndex, setPrevIndex] = useState(null)
	const DARK_CELL = '#B58763'
	const LIGHT_CELL = '#F0DAB5'
	const DARK_PIECE = '#1e1e1f'
	const LIGHT_PIECE = '#ffffff'

	function addHighlight(index) {
		const row = boardArray[index].row
		const col = boardArray[index].col
		const data = {
			move: { src: index },
			session_id: getSessionID()
		}
		socket.emit('get_possible_moves', data, (possible_moves) => {
			console.log(possible_moves)
			addCellsClass(possible_moves, 'move_cell')
			addCellClass(row, col, 'active_cell')
		})
	}

	function handleCellClick(e) {
		let cell = e.currentTarget;
		const currIndex = cell.dataset.index
		const currRow = cell.dataset.row
		const cellHasPiece = cell.dataset.piece !== 'none'
		if (prevIndex) {
			const prevPiece = boardArray[prevIndex].piece
			const data = {
				move: { 
					src: prevIndex, 
					dest: currIndex, 
					promotion: prevPiece === 'pawn' && (parseInt(currRow) === 8 || parseInt(currRow)) === 1 ? 'queen' : ' '
				},
				session_id: getSessionID(),
			}
			// verify move on server. If it's a valid move, server with emit back update_board
			socket.emit('verify_move', data, res => { console.log(res) })
			clearAllHighlight()
			setPrevIndex(null)
		}
		else if (cellHasPiece) {
			addHighlight(currIndex)
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
