import dataFoMuttedHeadersBtns from "../../data/dataForMuttedHeadersBtns.jsx";

function headerMuttedBtns() {
    return (
        <>
            {dataFoMuttedHeadersBtns.map((item) => (
                <div key={item.name} className="mutedButton">
                    <div className={item.name}>{item.icon}</div>
                    <span>
                        <svg width="12" height="12" viewBox="0 0 48 48" fill="none"><path d="M22.5409 31.4437L10.5787 18.6839C9.97995 18.0453 10.4328 17 11.3082 17L36.6918 17C37.5672 17 38.0201 18.0453 37.4213 18.6839L25.4591 31.4437C24.6689 32.2865 23.3311 32.2865 22.5409 31.4437Z" fill="#757575" stroke="#757575" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </span>
                </div>
            ))}
        </>
    )
}

export default headerMuttedBtns;
