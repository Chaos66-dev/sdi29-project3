import { render, screen, fireEvent } from "@testing-library/react";
import Units from "./Units.jsx";
import { UserProvider } from "../../context/UserContext.jsx";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";