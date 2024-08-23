export const getWidgetNames = (categories) => {
    return categories.flatMap(category =>
        category.widgets.map(widget => ({
            category: category.category,
            widget: widget.name,
        }))
    );
};
