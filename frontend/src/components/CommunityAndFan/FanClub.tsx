import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchMembersStart,
    fetchMembersSuccess,
    fetchMembersFailure,
    selectMembers,
    selectCurrentMember,
    selectActivities,
    selectLoading,
    selectError,
    Member
} from '../../store/slices/communityAndFan/fanClubSlice'; // Adjust the path accordingly

const FanClub: React.FC = () => {
    const dispatch = useDispatch();
    const members = useSelector(selectMembers);
    const currentMember = useSelector(selectCurrentMember);
    const activities = useSelector(selectActivities);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    // Mock function for fetching members; replace with actual API call.
    const fetchAllMembers = async (): Promise<Member[]> => {
        const mockMembers: Member[] = [
            {
                id: '1',
                name: 'John Doe',
                joinDate: '2022-01-01T12:00:00Z',
                membershipLevel: 'premium',
                profilePictureUrl: 'url-to-image1'
            },
            // ... more mock data
        ];

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockMembers);
            }, 1000);
        });
    };

    useEffect(() => {
        dispatch(fetchMembersStart());

        fetchAllMembers()
            .then(data => dispatch(fetchMembersSuccess(data)))
            .catch(err => dispatch(fetchMembersFailure(err.message)));
    }, [dispatch]);

    return (
        <div>
            <h1>Fan Club</h1>
            {currentMember && (
                <div>
                    <h2>Your Profile</h2>
                    <img src={currentMember.profilePictureUrl} alt={currentMember.name} />
                    <p>Name: {currentMember.name}</p>
                    <p>Joined on: {new Date(currentMember.joinDate).toLocaleDateString()}</p>
                    <p>Membership Level: {currentMember.membershipLevel}</p>
                </div>
            )}

            <h2>Recent Activities</h2>
            <ul>
                {activities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                ))}
            </ul>

            <h2>Members</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {members.map(member => (
                    <li key={member.id}>
                        <img src={member.profilePictureUrl} alt={member.name} />
                        <p>Name: {member.name}</p>
                        <p>Joined on: {new Date(member.joinDate).toLocaleDateString()}</p>
                        <p>Membership Level: {member.membershipLevel}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FanClub;
