import TabsMainPage from "../../data/tabsMainPage"
import { useState } from "react"

function ShowTabs({ activeTab, setActiveTab }) {
    const [hoveredTab, setHoveredTab] = useState(null);

    return (
        <div className="tabs-nav">
            <div className="tabs-list">
                {TabsMainPage.map((tab) => {
                    const isActive = activeTab === tab.key;
                    const isHovered = hoveredTab === tab.key;

                    return (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setActiveTab(tab.key)}
                            onMouseEnter={() => setHoveredTab(tab.key)}
                            onMouseLeave={() => setHoveredTab(null)}
                            className={["tabs-button", isActive ? "tabs-button--active" : ""].join(" ").trim()}
                        >
                            <img
                                src={isActive || isHovered ? tab.iconOn : tab.iconOff}
                                alt=""
                                className="tabs-icon"
                                draggable={false}
                            />

                            <span className="tabs-label">
                                {tab.label}
                            </span>

                            {isActive && (
                                <span className="tabs-indicator" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    )
}

export default ShowTabs
