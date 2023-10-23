import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setItems,
    toggleItemExpansion,
    expandAll,
    collapseAll,
    selectAccordionItems,
    AccordionItem as AccordionItemType
} from '../../../store/slices/interactivity/accordionSlice'; // Update path accordingly

const mockItems: AccordionItemType[] = [
    {
        id: '1',
        title: 'Item 1',
        content: 'This is the content for Item 1',
        isExpanded: false
    },
    {
        id: '2',
        title: 'Item 2',
        content: 'This is the content for Item 2',
        isExpanded: false
    },
    // ... Add more mock items as desired
];

const Accordion: React.FC = () => {
    const dispatch = useDispatch();
    const items = useSelector(selectAccordionItems);

    useEffect(() => {
        dispatch(setItems(mockItems));
    }, [dispatch]);

    return (
        <div>
            {items.map(item => (
                <div key={item.id} className="accordion-item">
                    <h3 onClick={() => dispatch(toggleItemExpansion(item.id))}>
                        {item.title}
                        {item.isExpanded ? ' ▼' : ' ►'}
                    </h3>
                    {item.isExpanded && <p>{item.content}</p>}
                </div>
            ))}
            <button onClick={() => dispatch(expandAll())}>Expand All</button>
            <button onClick={() => dispatch(collapseAll())}>Collapse All</button>
        </div>
    );
};

export default Accordion;

