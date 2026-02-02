"use client";

import { useGSAP } from "@gsap/react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import ShimmerButton from "@/components/ui/shimmer-button";
import { MessageCircle } from "lucide-react";

interface ShaderPlaneProps {
    vertexShader: string;
    fragmentShader: string;
    uniforms: { [key: string]: { value: unknown } };
}

function ShaderPlane({
    vertexShader,
    fragmentShader,
    uniforms,
}: ShaderPlaneProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const { size } = useThree();

    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.ShaderMaterial;
            material.uniforms.u_time.value = state.clock.elapsedTime * 0.5;
            material.uniforms.u_resolution.value.set(size.width, size.height, 1.0);
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                side={THREE.DoubleSide}
                depthTest={false}
                depthWrite={false}
            />
        </mesh>
    );
}

interface ShaderBackgroundProps {
    vertexShader?: string;
    fragmentShader?: string;
    uniforms?: { [key: string]: { value: unknown } };
    className?: string;
}

function ShaderBackground({
    vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
    gl_Position = vec4(position, 1.0);
    }
  `,
    fragmentShader = `
    precision highp float;
    varying vec2 vUv;
    uniform float u_time;
    uniform vec3 u_resolution;

    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 5; i++) {
            value += amplitude * noise(st);
            st *= 2.0;
            amplitude *= 0.5;
        }
        return value;
    }

    void main() {
        vec2 st = vUv;
        st.x *= u_resolution.x / u_resolution.y;
        
        vec2 q = vec2(0.);
        q.x = fbm(st + 0.00 * u_time);
        q.y = fbm(st + vec2(1.0));
        
        vec2 r = vec2(0.);
        r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * u_time);
        r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * u_time);
        
        float f = fbm(st + r);
        
        // Darker red tint (max 0.6 red)
        vec3 color = vec3(f * 0.6, 0.0, 0.0);
        
        gl_FragColor = vec4(color, 1.0);
    }
  `,
    uniforms = {},
    className = "w-full h-full",
}: ShaderBackgroundProps) {
    const shaderUniforms = useMemo(
        () => ({
            u_time: { value: 0 },
            u_resolution: { value: new THREE.Vector3(1, 1, 1) },
            ...uniforms,
        }),
        [uniforms],
    );

    return (
        <div className={className}>
            <Canvas className={className} dpr={[1, 1]}>
                <ShaderPlane
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={shaderUniforms}
                />
            </Canvas>
        </div>
    );
}

export default function InfiniteHero() {
    const rootRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.set(bgRef.current, { filter: "blur(28px)" });
            gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
                opacity: 0,
                y: 30,
                filter: "blur(8px)",
            });

            const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
            tl.to(bgRef.current, { filter: "blur(0px)", duration: 1.5 }, 0)
                .to(
                    [titleRef.current, subtitleRef.current, ctaRef.current],
                    {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 0.8,
                        stagger: 0.2,
                    },
                    0.5,
                );
        },
        { scope: rootRef },
    );

    return (
        <div
            ref={rootRef}
            className="relative h-svh w-full overflow-hidden bg-[#050000] text-white flex flex-col justify-end pb-20 md:justify-center md:pb-0"
        >
            <div className="absolute inset-0 z-0" ref={bgRef}>
                <ShaderBackground className="h-full w-full opacity-60" />
            </div>

            <div className="pointer-events-none absolute inset-0 z-0 [background:radial-gradient(circle_at_50%_50%,_transparent_0%,_#050000_80%)] opacity-90" />

            <div className="relative z-10 flex w-full items-center justify-center px-6">
                <div className="text-center max-w-4xl mx-auto" ref={contentRef}>
                    <h1
                        ref={titleRef}
                        className="mx-auto mb-8 text-4xl sm:text-6xl md:text-7xl font-black leading-[0.9] tracking-tighter text-white font-display uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    >
                        <span className="whitespace-nowrap block">COMUNIDADE PRIVADA</span>
                        <span className="whitespace-nowrap block">PARA PLAYERS DE</span>
                        <span className="whitespace-nowrap block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-[0_0_25px_rgba(255,255,255,0.5)]">DIRECT RESPONSE</span>
                    </h1>

                    <p
                        ref={subtitleRef}
                        className="mx-auto mt-6 mb-12 max-w-lg text-base md:text-lg leading-relaxed text-white/90 px-4 drop-shadow-lg font-medium font-sans"
                    >
                        A <strong className="text-white font-bold">ANTI FLUXO</strong> reúne players que fazem{" "}
                        <span className="text-white underline underline-offset-4 decoration-[#ef4444]">múltiplos 6 dígitos por dia</span> e{" "}
                        <span className="text-white underline underline-offset-4 decoration-[#ef4444]">players iniciantes</span>. Um único objetivo em comum: te{" "}
                        <span className="text-white underline underline-offset-4 decoration-[#ef4444]">ajudar a começar</span> e{" "}
                        <span className="text-white underline underline-offset-4 decoration-[#ef4444]">faturar com consistência</span> com{" "}
                        <span className="text-white underline underline-offset-4 decoration-[#ef4444]">tráfego direto</span> e{" "}
                        <span className="text-white underline underline-offset-4 decoration-[#ef4444]">X1 no WhatsApp</span>.
                    </p>

                    <div
                        ref={ctaRef}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
                    >
                        <a href="#pricing" className="w-auto">
                            <ShimmerButton
                                background="#dc2626"
                                shimmerColor="#ffcccc"
                                borderRadius="9999px"
                                className="w-auto px-8 py-3 text-white font-bold tracking-wide uppercase font-display text-base shadow-[0_0_30px_-5px_rgba(220,38,38,0.5)]"
                            >
                                QUERO ENTRAR
                            </ShimmerButton>
                        </a>

                        <a
                            href="https://wa.me/5571991511702"
                            target="_blank"
                            className="w-auto group flex items-center justify-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:scale-[1.02]"
                        >
                            <MessageCircle className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                            <span className="font-display tracking-wider uppercase text-xs font-bold opacity-90 group-hover:opacity-100">
                                Tirar Dúvidas
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
