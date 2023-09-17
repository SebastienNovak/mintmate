import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
type ReportItem = {
    id: string;
    reportType: 'content' | 'user' | 'other'; // Add any other report types if needed
    reportedEntityId: string; // ID of the content or user being reported
    reason: string;
    details: string; // Detailed report provided by the user
    dateReported: string;
    reviewed: boolean;
};

type ReportState = {
    reports: ReportItem[];
    isLoading: boolean;
    error: string | null;
};

// Initial State
const initialState: ReportState = {
    reports: [],
    isLoading: false,
    error: null
};

// Slice
const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        startFetchingReports: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setReports: (state, action: PayloadAction<ReportItem[]>) => {
            state.reports = action.payload;
            state.isLoading = false;
        },
        submitReportSuccess: (state, action: PayloadAction<ReportItem>) => {
            state.reports.push(action.payload);
            state.isLoading = false;
        },
        markReportReviewed: (state, action: PayloadAction<string>) => {
            const report = state.reports.find(r => r.id === action.payload);
            if (report) {
                report.reviewed = true;
            }
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

export const {
    startFetchingReports,
    setReports,
    submitReportSuccess,
    markReportReviewed,
    setError
} = reportSlice.actions;

// Thunks
/*
export const fetchReports = () => async (dispatch: any) => {
    dispatch(startFetchingReports());
    try {
        // Simulating an API call
        const response = await simulatedAPI.fetchReports();
        dispatch(setReports(response.data));
    } catch (error) {
        dispatch(setError('An error occurred while fetching the reports.'));
    }
};
*/

// Selectors
type RootState = {
    report: ReportState;
};

export const selectAllReports = (state: RootState) => state.report.reports;
export const selectUnreviewedReports = (state: RootState) => state.report.reports.filter(r => !r.reviewed);
export const selectIsLoading = (state: RootState) => state.report.isLoading;
export const selectError = (state: RootState) => state.report.error;

export default reportSlice.reducer;
