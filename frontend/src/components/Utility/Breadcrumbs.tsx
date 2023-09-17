import React from 'react';
import { useSelector } from 'react-redux';
import { selectBreadcrumbs } from '../../store/slices/utility/breadcrumbsSlice';
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom for routing

const Breadcrumbs: React.FC = () => {
    const breadcrumbs = useSelector(selectBreadcrumbs);

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {breadcrumbs.map((breadcrumb, index) => (
                    <li key={index} className="breadcrumb-item">
                        {breadcrumb.link 
                            ? <Link to={breadcrumb.link}>{breadcrumb.label}</Link> 
                            : breadcrumb.label}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

export default Breadcrumbs;
