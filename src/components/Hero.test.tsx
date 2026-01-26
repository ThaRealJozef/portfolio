import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Hero from './Hero';
import '@testing-library/jest-dom';

// Mock Lucide icons
vi.mock('lucide-react', async (importOriginal) => {
    const actual = await importOriginal() as any;
    return {
        ...actual,
        // Add specific mocks if needed, or just let them render as default SVG
    };
});

// Mock environment hooks since they query browser APIs
vi.mock('@/components/Hero', async (importOriginal) => {
    return await importOriginal();
});

describe('Hero Component', () => {
    it('renders critical call-to-action buttons', () => {
        const scrollFn = vi.fn();
        render(<Hero bio="Test Bio" githubUrl="#" onScrollToProjects={scrollFn} />);

        // Check for Deploy Mission button
        expect(screen.getByRole('button', { name: /DEPLOY MISSION/i })).toBeInTheDocument();

        // Check for Access Repo link/button
        expect(screen.getByRole('link', { name: /ACCESS REPO/i })).toBeInTheDocument();
    });

    it('renders system status indicators (responsive)', () => {
        const scrollFn = vi.fn();
        render(<Hero bio="Test Bio" githubUrl="#" onScrollToProjects={scrollFn} />);

        // Check for "SYS" (Mobile) or "sys_OK" (Desktop) - getAll matches both
        const sysIndicators = screen.getAllByText(/sys/i);
        expect(sysIndicators.length).toBeGreaterThan(0);
    });
});
