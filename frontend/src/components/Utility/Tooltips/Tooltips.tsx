import React, { CSSProperties } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    hideTooltip,
    selectIsTooltipVisible,
    selectTooltipContent,
    selectTooltipPosition
} from '../../../store/slices/utility/tooltipsSlice';

const Tooltip: React.FC = () => {
    const dispatch = useDispatch();
    const isVisible = useSelector(selectIsTooltipVisible);
    const content = useSelector(selectTooltipContent);
    const position = useSelector(selectTooltipPosition);

    const styles: CSSProperties = {
        display: isVisible ? 'block' : 'none',
        position: 'absolute',
        left: position?.x,
        top: position?.y,
        background: '#333',
        color: 'white',
        padding: '5px',
        borderRadius: '3px',
        zIndex: 1000,
    };

    return (
        <div style={styles} onMouseLeave={() => dispatch(hideTooltip())}>
            {content}
        </div>
    );
}

export default Tooltip;
