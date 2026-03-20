export default function CategoriesFilter({
    title = "Categories",
    categories = [],
    selectedCategories = [],
    onToggleCategory = () => {},
}) {
    if (!categories.length) {
        return null;
    }

    return (
        <div>
            <h3>{title}</h3>
            <div className="categories">
                {categories.map((category) => (
                    <label key={category}>
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => onToggleCategory(category)}
                        />
                        {category}
                    </label>
                ))}
            </div>
        </div>
    );
}
