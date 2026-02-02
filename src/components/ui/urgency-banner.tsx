"use client";

import { useEffect, useState } from "react";

export default function UrgencyBanner() {
    const [dateText, setDateText] = useState("");

    useEffect(() => {
        const today = new Date();
        const day1 = today.getDate();
        const day2 = day1 + 1;
        const day3 = day1 + 2;

        const monthNames = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];

        const monthName = monthNames[today.getMonth()];

        setDateText(`Somente nos dias: ${day1}, ${day2} e ${day3} de ${monthName} você terá um desconto especial de 85%`);
    }, []);

    return (
        <div className="w-full bg-[#dc2626] text-white py-3 px-4 text-center relative overflow-hidden z-50">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_3s_linear_infinite]"></div>
            </div>

            <div className="relative z-10 font-sans">
                <p className="font-bold text-xs sm:text-sm md:text-base uppercase tracking-wide">
                    {dateText}
                </p>
            </div>
        </div>
    );
}
