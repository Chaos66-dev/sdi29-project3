import { render, screen, fireEvent } from '@testing-library/react';
import AllPersonnel from './AllPersonnel.jsx';
import { UserProvider } from '../../context/UserContext.jsx';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';


describe("Personnel Test", () => {

    it('Check for Personnel page', () => {
        const { container } = render(
            <UserProvider>
                <AllPersonnel />
            </UserProvider>
        );
        expect(screen.getByText('All Personnel')).toBeInTheDocument();
    });
});
