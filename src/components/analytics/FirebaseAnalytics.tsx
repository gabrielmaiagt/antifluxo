"use client";

import { useEffect, useState } from 'react';
import { analytics } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';
import { getSessionId, trackEvent, initConversion } from '@/lib/analytics';

export default function FirebaseAnalytics() {
    const [tracked, setTracked] = useState(false);

    useEffect(() => {
        if (tracked) return;

        const sessionId = getSessionId();

        // Log page view to Firebase Analytics
        if (analytics) {
            logEvent(analytics, 'page_view', {
                page_title: 'Anti Fluxo - Landing Page',
                page_location: window.location.href,
                page_path: window.location.pathname,
            });
        }

        // Track funnel entry and initialize conversion
        trackEvent('funnel_entry', { page: '/' });
        initConversion(sessionId);

        // Scroll depth tracking
        const scrollDepths = [25, 50, 75, 100];
        const trackedDepths = new Set<number>();

        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            const scrollPercent = (scrolled / documentHeight) * 100;

            scrollDepths.forEach(depth => {
                if (scrollPercent >= depth && !trackedDepths.has(depth)) {
                    trackedDepths.add(depth);
                    trackEvent('scroll_depth', { depth, sessionId });

                    if (analytics) {
                        logEvent(analytics, 'scroll', { depth });
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        setTracked(true);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [tracked]);

    return null;
}
