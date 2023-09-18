import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchLanguage, selectCurrentLanguage, Language } from '../../store/slices/localization/languageSwitcherSlice'; // Update the path to your Redux slice

const LanguageSwitcher: React.FC = () => {
    const dispatch = useDispatch();
    const currentLanguage = useSelector(selectCurrentLanguage);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(switchLanguage(e.target.value as Language));
    };

    return (
        <div>
            <label htmlFor="language-selector">Choose language:</label>
            <select 
                id="language-selector" 
                value={currentLanguage} 
                onChange={handleChange}
            >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
            </select>
        </div>
    );
};

export default LanguageSwitcher;
