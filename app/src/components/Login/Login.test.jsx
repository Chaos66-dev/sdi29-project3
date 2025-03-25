import { render, screen } from "@testing-library/react";
import Login from "./Login.jsx";
import { UserProvider } from "../../context/UserContext.jsx";
import { describe, it, expect, beforeEach } from "vitest";

// afterEach(() => {
//     vi.restoreAllMocks(); // Clean up after each test
//   });

beforeEach(() => {
    render(
        <UserProvider>
            <Login />
        </UserProvider>
        );
});

// console.log(document); // This should not be undefined in jsdom environment

describe("basic test", () => {

    it('butchunkc',  () => {
        expect(true).toBe(true)
    });
});