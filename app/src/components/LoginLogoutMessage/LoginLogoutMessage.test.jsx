import { render, screen, fireEvent } from "@testing-library/react";
import LoginLogoutMessage from "./LoginLogoutMessage.jsx";
import { UserProvider } from "../../context/UserContext.jsx";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";