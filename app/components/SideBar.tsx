'use client'

import Image from "next/image";

export default function SideBar() {
    return(
        <div className={"w-[230px] h-full bg-gray-50"}>
            <div>
                <div className={'flex'}>
                    <Image
                        src='/logo.png'
                        alt="AI Generated"
                        width={50}
                        height={49}
                        className="rounded-lg object-cover"
                    />

                    <h1>
                        CINEROPE
                    </h1>
                </div>
            </div>

            <div className={'flex flex-col'}>
                <nav>
                    <p>dashboard</p>
                    <p>project</p>
                    <p>setting</p>
                </nav>

                <nav>
                    <p>project 1</p>
                    <p>project 2</p>
                    <div>
                        <p>project add</p>
                    </div>
                </nav>
            </div>

            <div>
                <div>
                    <div>
                        <Image
                            src='/logo.png'
                            alt="AI Generated"
                            width={40}
                            height={40}
                            className="rounded-lg object-cover"
                        />

                        <p>KIM JUNSOO</p>
                    </div>
                    <div>
                        <Image
                            src='/logo.png'
                            alt="AI Generated"
                            width={16}
                            height={16}
                            className="rounded-lg object-cover"
                        />

                        <p>PLUS</p>
                    </div>
                </div>

                <div>
                    <div>
                        <Image
                            src='/logo.png'
                            alt="AI Generated"
                            width={13.5}
                            height={13.5}
                            className="rounded-lg object-cover"
                        />
                        <p>
                            Log Out
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}