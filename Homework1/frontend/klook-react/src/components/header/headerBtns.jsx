import TextBtns from '../../data/dataForHeader.js'

function headerBtns() {
    return (
        <>
            {TextBtns.map((item) => (
                <button key={item} className='btn'>{item}</button>
            )
            )}
        </>
    )
}

export default headerBtns;
