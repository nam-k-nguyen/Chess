export default function Cell({ content, cellNumber, color, handleCellClick }) {

  return (
    <div className='cell_container'>
        <div 
            className='cell' 
            style={{background: color}} 
            onClick={handleCellClick}
            data-cell_number={cellNumber}
        >
          {content}
        </div>
    </div>
  )
}
