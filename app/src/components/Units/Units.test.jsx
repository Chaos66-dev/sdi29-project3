import { render, screen, fireEvent } from "@testing-library/react";
import Units from "./Units.jsx";
import { UserProvider } from "../../context/UserContext.jsx";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("Test for Units", () => {

    it('Check for Unit page', () => {
        const { container } = render(
            <UserProvider>
                <Units />
            </UserProvider>
        );
        expect(screen.getByText('Units Page')).toBeInTheDocument();
        expect(screen.getByText('View All Units and Assigned Employees')).toBeInTheDocument();
    });
});
