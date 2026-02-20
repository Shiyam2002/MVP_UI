"use client";

import Logo from "@/src/components/icon/Axora";
import SmoothWavyCanvas from "@/src/components/ui/SmoothWavyCanvas";

interface Props {
    children: React.ReactNode;
}

export function AuthLayout({ children }: Props) {
    return (
        <div className="h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden flex">

                {/* LEFT PANEL */}
                <div className="hidden lg:flex lg:w-[60%] relative overflow-hidden flex-col justify-between p-12">
                    <SmoothWavyCanvas
                        backgroundColor="#faf6e9ff"
                        primaryColor="10, 10, 10"
                        secondaryColor="30, 30, 30"
                        accentColor="50,50,50"
                        lineOpacity={1.5}
                        animationSpeed={0.004}
                    />

                    <div className="relative z-10 flex items-center gap-2">
                        <Logo className="h-8 w-8 text-gray-900" />
                        <h1 className="text-2xl font-semibold text-gray-900">Axora</h1>
                    </div>

                    <p className="relative z-10 text-gray-700 text-lg max-w-md">
                        Empower your productivity with Axora — your intelligent work companion.
                    </p>
                </div>

                {/* RIGHT PANEL */}
                <div className="w-full lg:w-[40%] flex items-center justify-center p-8 lg:p-12">
                    <div className="w-full max-w-md space-y-6">
                        {children}
                    </div>
                </div>

            </div>
        </div>
    );
}
