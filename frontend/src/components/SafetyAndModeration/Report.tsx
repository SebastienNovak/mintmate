import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchReports,
    selectAllReports,
    selectUnreviewedReports,
    selectIsLoading,
    selectError,
    markReportReviewed
} from '../../store/slices/safetyAndModeration/reportSlice';
import { AppDispatch } from '../../store/store';

const ReportComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const allReports = useSelector(selectAllReports);
    const unreviewedReports = useSelector(selectUnreviewedReports);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchReports()); // This is commented out in your slice, so make sure you have an actual API call here
    }, [dispatch]);

    const handleReviewReport = (reportId: string) => {
        dispatch(markReportReviewed(reportId));
    };

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            <h2>All Reports</h2>
            <ul>
                {allReports.map(report => (
                    <li key={report.id}>
                        <h3>{report.reportType}</h3>
                        <p>{report.reason}</p>
                        <p>{report.details}</p>
                        <span>Reported on: {report.dateReported}</span>
                        {report.reviewed ? (
                            <span>Reviewed</span>
                        ) : (
                            <button onClick={() => handleReviewReport(report.id)}>Mark as Reviewed</button>
                        )}
                    </li>
                ))}
            </ul>
            <h2>Unreviewed Reports</h2>
            <ul>
                {unreviewedReports.map(report => (
                    <li key={report.id}>
                        <h3>{report.reportType}</h3>
                        <p>{report.reason}</p>
                        <p>{report.details}</p>
                        <span>Reported on: {report.dateReported}</span>
                        <button onClick={() => handleReviewReport(report.id)}>Mark as Reviewed</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReportComponent;
