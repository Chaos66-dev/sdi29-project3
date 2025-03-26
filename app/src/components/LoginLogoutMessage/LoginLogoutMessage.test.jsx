import { render, screen, fireEvent } from "@testing-library/react";
import LoginLogoutMessage from "./LoginLogoutMessage.jsx";
import { UserProvider } from "../../context/UserContext.jsx";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";


describe("LoginLogout Message Test", () => {

    it('Check for the basic login/logout message', () => {
        render(
            <UserProvider>
                <LoginLogoutMessage />
            </UserProvider>
        );
    });
});

