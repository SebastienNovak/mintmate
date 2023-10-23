import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchMilestonesStart, 
    fetchMilestonesSuccess, 
    fetchMilestonesFailure, 
    updateMilestoneStatus, 
    selectMilestonesByProjectId, 
    Milestone,
    MilestoneStatus,
    selectLoading,
    selectError,
} from '../../../store/slices/communityAndFan/milestonesSlice'; // Adjust the path accordingly
import { RootState } from '../../../store/store'; // Assuming you have a combined rootReducer

type MilestonesProps = {
    projectId: string;
};

const Milestones: React.FC<MilestonesProps> = ({ projectId }) => {
    const dispatch = useDispatch();
    const milestones = useSelector((state: RootState) => selectMilestonesByProjectId(state, projectId));
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    // Mock function to fetch milestones. Replace with actual API call.
    const fetchProjectMilestones = async (): Promise<Milestone[]> => {
        const mockMilestones: Milestone[] = [
            // ... mock data
        ];

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockMilestones);
            }, 1000);
        });
    };

    useEffect(() => {
        dispatch(fetchMilestonesStart());

        fetchProjectMilestones()
            .then(data => dispatch(fetchMilestonesSuccess(data)))
            .catch(err => dispatch(fetchMilestonesFailure(err.message)));
    }, [dispatch, projectId]);

    return (
        <div>
            <h1>Milestones for Project {projectId}</h1>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <ul>
                {milestones.map(milestone => (
                    <li key={milestone.id}>
                        <h3>{milestone.title}</h3>
                        <p>{milestone.description}</p>
                        <p>Due Date: {milestone.dueDate}</p>
                        <p>Status: {milestone.status}</p>
                        <div>
                            <label>Update Status:</label>
                            <select 
                                value={milestone.status} 
                                onChange={e => 
                                    dispatch(updateMilestoneStatus({ 
                                        milestoneId: milestone.id, 
                                        status: e.target.value as MilestoneStatus 
                                    }))
                                }
                            >
                                <option value="planned">Planned</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Milestones;
