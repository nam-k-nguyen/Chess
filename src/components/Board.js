import { useState } from 'react';
import Cell from './Cell';
import { useSocket } from '../context/SocketContext';
import { getPossibleMoves, rowColToIndex, toggleCellClass, toggleMultipleCellClass } from '../util';

export default function Board() {
	const { socket, boardArray, setBoardArray } = useSocket()
	const [prevCell, setPrevCell] = useState(null)

	function handleCellClick(e) {
		let cell = e.currentTarget;
		
		let currPiece = cell.dataset.piece
		let currPieceColor = cell.dataset.pieceColor
		let currRow = parseInt(cell.dataset.row)
		let currCol = parseInt(cell.dataset.col)
		let currPossibleMoves = getPossibleMoves(currPiece, currRow, currCol)
		let currIndex = rowColToIndex(currRow, currCol)
		
		let cellHasPiece = currPiece !== 'none'
		console.log('\n\nCLICKED')
		console.log('current cell:', cell)
		console.log('\tpiece: ', currPiece)
		console.log('\tpiece color: ', currPieceColor)
		console.log('\trow:', currRow)
		console.log('\tcol:', currCol)
		console.log('\tpossible moves: ', currPossibleMoves)
		console.log('\tindex: ', currIndex)

		console.log('previous cell:', prevCell)
		console.log('\tpiece: ', prevCell ? prevCell.dataset.piece : 'none')
		console.log('\tpiece color: ', prevCell ? prevCell.dataset.pieceColor : 'none')
		console.log('\trow:', prevCell ? prevCell.dataset.row : 'none')
		console.log('\tcol:', prevCell ? prevCell.dataset.col  : 'none')
		console.log('\tpossible moves:', prevCell ? getPossibleMoves(prevCell.dataset.currPiece, prevCell.dataset.row, prevCell.dataset.col)  : 'none')
		console.log('\tindex: ', prevCell ? rowColToIndex(prevCell.dataset.row, prevCell.dataset.col) : 'none')

		if (!prevCell) {
			console.log('there is no prevCell')

			if (!cellHasPiece) { return }
			if (cellHasPiece) {
				toggleMultipleCellClass(currPossibleMoves, 'move_cell')
				toggleCellClass(currRow, currCol, 'active_cell')
				setPrevCell(cell)
			}
		}

		else if (prevCell) {
			console.log('there is prevCell')

			let prevPiece = prevCell.dataset.piece
			let prevRow = parseInt(prevCell.dataset.row)
			let prevCol = parseInt(prevCell.dataset.col)
			let prevPossibleMoves = getPossibleMoves(prevPiece, prevRow, prevCol)
			let prevIndex = rowColToIndex(prevRow, prevCol)

			console.log(prevPossibleMoves)
			
			// If the clicked cell is included in the possible moves of the previous cell
			for (let i = 0; i < prevPossibleMoves.length; i++) {
				if (prevPossibleMoves[i].row === currRow && prevPossibleMoves[i].col === currCol) {
					console.log(currRow, " = ", currCol)
					setBoardArray(prev => {
						let temp = prev
						temp[currIndex].piece = prevPiece 
						temp[currIndex].pieceColor =  prev[prevIndex].pieceColor
						temp[prevIndex].piece = 'none'
						temp[prevIndex].pieceColor = 'none'
						console.log('board array', temp)
						socket.emit('update_board', {
							board: temp, 
							session_id: sessionStorage.getItem('chess_session_id')
						})
						return temp
					})
					break;
				}
			}
			toggleMultipleCellClass(prevPossibleMoves, 'move_cell')
			setPrevCell(null)
			toggleCellClass(prevRow, prevCol, 'active_cell')
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
					pieceColor={cell.pieceColor}
					cellColor={cell.cellColor}
					handleCellClick={handleCellClick}
				/>
			})}
		</div>
	)
}
