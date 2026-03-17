'use client';

/**
 * Legacy: Registers full GSAP plugin suite.
 * Prefer component-level registration (Loader, Hero, etc.) for better code-splitting.
 * Import this only when you need ScrollTrigger + SplitText in a single place.
 */
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, useGSAP, CustomEase, SplitText);
