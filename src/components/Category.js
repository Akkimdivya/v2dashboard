import React, { useContext } from 'react';
import Widget from './Widget';
import { DashboardContext } from '../context/DashboardContext';
import '../category.css';
import { MdDeleteForever } from 'react-icons/md';

function Category({ searchQuery }) {
    const {
        categories,
        isOpen,
        setIsOpen,
        setActiveCategory,
        removeCategory
    } = useContext(DashboardContext);

    const toggleSidebar = (category) => {
        setActiveCategory(category);
        setIsOpen(!isOpen);
        document.body.style.overflow = isOpen ? 'auto' : 'hidden';
    };

    const filterWidgets = (widgets) => {
        if (!searchQuery) return widgets;
        return widgets.filter(widget =>
            widget.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    return (
        <div className='px-5'>
            {categories.map((category) => (
                <div key={category.category} className="mb-8">
                    <div className='flex items-center'>
                        <h2 className="text-lg font-bold mt-7">{category.category}</h2>
                        <button
                            title='Delete Category'
                            className='mt-7 ml-3 text-blue-500 hover:text-red-500 transition-colors'
                            onClick={() => removeCategory(category.category)}
                        >
                            <MdDeleteForever />
                        </button>
                    </div>

                    <div className="widget-container rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {filterWidgets(category.widgets.filter(wid => wid.status === 'active')).map((widget) => (
                            <Widget key={widget.name} widget={widget} category={category.category} />
                        ))}
                        <div className='bg-white p-4 py-10 rounded-lg shadow-lg flex justify-center items-center h-[14rem]'>
                        <button 
                                onClick={() => toggleSidebar(category.category)}
                                className='border-[1.5px] text-sm font-semibold border-gray-500 rounded p-2 text-gray-600 hover:text-gray-800 hover:border-gray-800 transition-colors w-[100%] m-28'
                            >
                                + Add Widget
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Category;
