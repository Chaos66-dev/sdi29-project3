import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login.jsx";
import { UserProvider } from "../../context/UserContext.jsx";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

afterEach(() => {
    vi.restoreAllMocks(); // Clean up after each test
  });

beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue([{ id: "123", name: "John Doe" }]), // mock response data
    });
});

describe("Button Test", () => {

    it('Check for the basic login buttons', () => {
        render(    
        <UserProvider>
            <Login />
        </UserProvider>
        );
        expect( screen.getByText("Sign In")).toBeInTheDocument();
        expect( screen.getByText("Sign Out")).toBeInTheDocument();
    });

    it('Check for the basic input field', () => {
        const { container } = render(    
        <UserProvider>
            <Login />
        </UserProvider>
        );
        expect( container.querySelector("#user-id-input")).toBeInTheDocument();
    });
});

