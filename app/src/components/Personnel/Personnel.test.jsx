import { render, screen, fireEvent } from "@testing-library/react";
import Personnel from "./Personnel.jsx";
import { UserProvider } from "../../context/UserContext.jsx";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";