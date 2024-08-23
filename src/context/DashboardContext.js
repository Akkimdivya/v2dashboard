import React, { createContext, useState, useEffect } from 'react';

const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
    const loadFromLocalStorage = () => {
        try {
            const serializedState = localStorage.getItem('dashboardState');
            if (serializedState === null) return undefined;
            return JSON.parse(serializedState);
        } catch (err) {
            console.error('Could not load state', err);
            return undefined;
        }
    };

    const saveToLocalStorage = (state) => {
        try {
            const serializedState = JSON.stringify(state);
            localStorage.setItem('dashboardState', serializedState);
        } catch (err) {
            console.error('Could not save state', err);
        }
    };

    const initialCategories = [
        {
            category: 'CSPM Executive Dashboard',
            widgets: [
                {
                    name: "Cloud Accounts",
                    status: 'active',
                    type: "doughnut",
                    data: {
                        labels: ['Connected', 'Not Connected', 'In hold'],
                        value: [3, 2, 2],
                        total: 7
                    }
                },
                {
                    name: "Cloud Account Risk Assessment",
                    status: 'active',
                    type: "doughnut",
                    data: {
                        labels: ["Failed", "Warning", "Not available", "Passed"],
                        value: [689, 681, 56, 7253],
                        total: 8659
                    }
                }
            ]
        },
        {
            category: "CWPP Dashboard",
            widgets: [
                {
                    name: "Top 5 Namespace Specific Alerts",
                    status: 'active',
                    data: null
                },
                {
                    name: "Workload Alerts",
                    status: 'active',
                    data: null
                }
            ]
        },
        {
            category: "Registry Scan",
            widgets: [
                {
                    name: "Image Risk Assessment",
                    status: 'active',
                    type: "progress",
                    data: {
                        labels: ["Critical", "High", "Medium", "Normal", "Low"],
                        value: [90, 150, 303, 250, 2],
                        total: 1479
                    }
                },
                {
                    name: "Image Security Issues",
                    status: 'active',
                    type: "progress",
                    data: {
                        labels: ["Critical", "High", "Medium", "Normal"],
                        value: [12, 50, 100, 30],
                        total: 212
                    }
                }
            ]
        }
    ];

    const [categories, setCategories] = useState(loadFromLocalStorage()?.categories || initialCategories);
    const [isOpen, setIsOpen] = useState(loadFromLocalStorage()?.isOpen || false);
    const [activeCategory, setActiveCategory] = useState(loadFromLocalStorage()?.activeCategory || null);

    // Save state to localStorage whenever it changes
    useEffect(() => {
        saveToLocalStorage({ categories, isOpen, activeCategory });
    }, [categories, isOpen, activeCategory]);

    const addCategory = (categoryName) => {
        setCategories(prevCategories => {
            const newCategories = [...prevCategories, { category: categoryName, widgets: [] }];
            saveToLocalStorage({ categories: newCategories, isOpen, activeCategory });
            return newCategories;
        });
    };

    const removeCategory = (categoryName) => {
        setCategories(prevCategories => {
            const newCategories = prevCategories.filter(cate => cate.category !== categoryName);
            saveToLocalStorage({ categories: newCategories, isOpen, activeCategory });
            return newCategories;
        });
    };

    const addWidget = (categoryName, widget) => {
        setCategories(prevCategories => {
            const newCategories = prevCategories.map(cate =>
                cate.category === categoryName
                    ? { ...cate, widgets: [...cate.widgets, widget] }
                    : cate
            );
            saveToLocalStorage({ categories: newCategories, isOpen, activeCategory });
            return newCategories;
        });
    };

    const removeWidget = (categoryName, widgetName) => {
        setCategories(prevCategories => {
            const newCategories = prevCategories.map(cate =>
                cate.category === categoryName
                    ? { ...cate, widgets: cate.widgets.filter(widget => widget.name !== widgetName) }
                    : cate
            );
            saveToLocalStorage({ categories: newCategories, isOpen, activeCategory });
            return newCategories;
        });
    };

    const updateWidgetStatus = (categoryName, widgetName, status) => {
        setCategories(prevCategories => {
            const newCategories = prevCategories.map(cate =>
                cate.category === categoryName
                    ? {
                        ...cate,
                        widgets: cate.widgets.map(widget =>
                            widget.name === widgetName
                                ? { ...widget, status }
                                : widget
                        )
                    }
                    : cate
            );
            saveToLocalStorage({ categories: newCategories, isOpen, activeCategory });
            return newCategories;
        });
    };

    return (
        <DashboardContext.Provider value={{
            categories,
            isOpen,
            activeCategory,
            addCategory,
            removeCategory,
            addWidget,
            removeWidget,
            updateWidgetStatus,
            setIsOpen,
            setActiveCategory,
        }}>
            {children}
        </DashboardContext.Provider>
    );
};

export { DashboardContext, DashboardProvider };
