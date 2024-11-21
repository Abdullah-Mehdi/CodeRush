import { render, screen, fireEvent } from '@testing-library/react';
import Leaderboard from '../../components/Leaderboard';
import axiosInstance from '../../axiosConfig';

jest.mock('../../axiosConfig');

describe('Leaderboard Component', () => {
    const mockLeaderboardData = [
        {
            id: 1,
            problemId: 1,
            username: "TestUser1",
            timeInSeconds: 120,
            completedAt: "2024-11-19T01:00:00"
        }
    ];

    beforeEach(() => {
        axiosInstance.get.mockResolvedValue({ data: mockLeaderboardData });
    });

    test('renders leaderboard with data', async () => {
        render(<Leaderboard />);
        
        // Wait for data to load
        const username = await screen.findByText('TestUser1');
        expect(username).toBeInTheDocument();
        
        // Check time formatting
        const time = await screen.findByText('2:00');
        expect(time).toBeInTheDocument();
    });
});
