import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setFontSize,
    toggleHighContrast,
    toggleScreenReaderOptimization,
    resetAccessibilitySettings,
    selectFontSize,
    selectHighContrast,
    selectScreenReaderOptimization
} from '../../../store/slices/settingsAndConfiguration/accessibilitySettingsSlice';

const AccessibilitySettings: React.FC = () => {
    const dispatch = useDispatch();
    
    const fontSize = useSelector(selectFontSize);
    const highContrast = useSelector(selectHighContrast);
    const screenReaderOptimized = useSelector(selectScreenReaderOptimization);

    return (
        <div className="accessibility-settings">
            <h2>Accessibility Settings</h2>

            <div>
                <label>Font Size: </label>
                <select 
                    value={fontSize}
                    onChange={(e) => dispatch(setFontSize(e.target.value as 'small' | 'medium' | 'large'))}
                >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
            </div>

            <div>
                <label>
                    <input 
                        type="checkbox" 
                        checked={highContrast} 
                        onChange={() => dispatch(toggleHighContrast())} 
                    />
                    High Contrast Mode
                </label>
            </div>

            <div>
                <label>
                    <input 
                        type="checkbox" 
                        checked={screenReaderOptimized} 
                        onChange={() => dispatch(toggleScreenReaderOptimization())} 
                    />
                    Screen Reader Optimization
                </label>
            </div>

            <button onClick={() => dispatch(resetAccessibilitySettings())}>
                Reset to Default
            </button>
        </div>
    );
};

export default AccessibilitySettings;
