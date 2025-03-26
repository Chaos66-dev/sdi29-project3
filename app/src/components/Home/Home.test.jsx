import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./Home.jsx";
import { UserProvider } from "../../context/UserContext.jsx";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
// import { ThemeToggle } from "../ThemeToggle/ThemeToggle.jsx";

describe("Home Page Test", () => {

    it('Check for Home page', () => {
        const { container } = render(
            <UserProvider>
                <Home />
            </UserProvider>
        );
    });
});
