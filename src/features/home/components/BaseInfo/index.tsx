import Image from "next/image";
import { FC } from "react";

const BaseInfo: FC = () => {
    return (
        <div className="flex justify-center flex-col items-center py-15">
            {/* <Image src="/avatar.svg" alt="avatar" width={500} height={500} className="mb-5" /> */}
            <div className="w-35 h-35 rounded-[50%] bg-amber-200" />
            <h1 className="font-heading text-[72px] font-bold mb-7.5">Culyson</h1>
            <p className="text-center max-w-2xl text-[18px] text-muted-foreground mb-9">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, ullam aliquid? Molestias cumque culpa, magnam repellat dicta suscipit quaerat ipsa? Recusandae dolores atque commodi. Aspernatur dolore modi vel a harum!</p>
            <div className="flex justify-center gap-4">
                <p>Theo dõi tôi: </p>
                <a href="https://www.facebook.com/mai.linh.ong.2024/" target="_blank" rel="noopener noreferrer">
                    <Image src="/icons/icon-facebook.png" alt="Facebook" width={24} height={24} className="mb-5 grayscale transition-all hover:grayscale-0" /> 
                </a>
                <a href="https://www.instagram.com/mailinhdong/" target="_blank" rel="noopener noreferrer">
                    <Image src="/icons/icon-instagram.png" alt="Instagram" width={24} height={24} className="mb-5 grayscale transition-all hover:grayscale-0" /> 
                </a>
            </div>
        </div>
    );
};

export default BaseInfo;