"use client";

import { useCallback, useRef, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "./Button";

export default function Modal({ children }: { children: ReactNode }) {
    const overlay = useRef<HTMLDivElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const onDismiss = useCallback(() => {        
        router.push("/");
    }, [router]);

    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target === overlay.current) && onDismiss) {
            onDismiss();
        }
    }, [onDismiss, overlay]);

    return (
        <div ref={overlay} className="modal" onClick={(e) => handleClick(e)}>
            <Button type="button" onClick={onDismiss} className="absolute top-4 right-8">
                <Image src="/close.svg" width={17} height={17} alt="close" />
            </Button>

            <div ref={wrapper} className="modal_wrapper">
                {children}
            </div>
        </div>
    );
}