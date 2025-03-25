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

console.log(global.document); // This should not be undefined in jsdom environment

describe("basic test", () => {

    it('butchunkc', async () => {
        render(    
        <UserProvider>
            <Login />
        </UserProvider>
        );
        expect(await screen.getByText("Sign In")).toBeInTheDocument();
    });
});