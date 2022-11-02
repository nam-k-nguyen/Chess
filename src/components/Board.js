import Cell from './Cell';
import { useSocket } from '../context/SocketContext';

export default function Board() {
	const { boardArray } = useSocket()

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
				/>	
			})}
		</div>
	)
}
