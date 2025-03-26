import { render, screen, fireEvent } from '@testing-library/react';
import Create from './Create.jsx';
import { UserProvider } from '../../context/UserContext.jsx';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';


describe("Create Test", () => {

    it('Check for Unit sub-page and elements', () => {
        const { container } = render(
            <UserProvider>
                <Create />
            </UserProvider>
        );
        expect(screen.getAllByText('Add Unit')[0]).toBeInTheDocument();
        expect(container.querySelector('#add-unit-name-input')).toBeInTheDocument();
        expect(screen.getAllByText('Update Unit')[0]).toBeInTheDocument();
        expect(container.querySelector('#update-unit-name-input')).toBeInTheDocument();
        expect(screen.getAllByText('Remove Unit')[0]).toBeInTheDocument();
    });

    // not sure how to test for this since it's on a different tab
    // it('Check for Employee sub-page and elements', () => {
    //     const { container } = render(
    //         <UserProvider>
    //             <Create />
    //         </UserProvider>
    //     );
    //     expect(screen.getAllByText('Add Employee')[0]).toBeInTheDocument();
    //     expect(screen.getByText('Update Employee Records')).toBeInTheDocument();
    //     expect(screen.getByText('Update Employee')).toBeInTheDocument();
    //     expect(screen.getAllByText('Remove Employee')[0]).toBeInTheDocument();
    // });

    // it('Check for Employees sub-page and elements', () => {
    //     const { container } = render(
    //         <UserProvider>
    //             <Create />
    //         </UserProvider>
    //     );
    //     expect(screen.getAllByText('Add Employee')[0]).toBeInTheDocument();
    //     expect(container.querySelector('#add-unit-name-input')).toBeInTheDocument();
    // });
});
