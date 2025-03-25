import { render, screen, fireEvent } from "@testing-library/react";
import Training from "./Training.jsx";
import { UserProvider } from "../../context/UserContext.jsx";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";