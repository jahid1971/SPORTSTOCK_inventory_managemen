import React from "react";

export function HomeCard({
    title,
    value,
    icon,
}: {
    title: string;
    value: number;
    icon: React.ReactNode;
    subtext?: string;
}) {
    return (
        <div className="@container/card w-full rounded-xl border bg-card text-card-foreground bg-gradient-to-t from-primary-300 to-card dark:bg-card shadow-lg p-4 border-primary-200">
            <div className="flex flex-col space-y-1.5  relative">
                <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-muted-foreground">
                        {title}
                    </p>
                </div>

                <div className="flex justify-between items-center ">
                    {" "}
                    <h3 className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums text-slate-600">
                        {value}
                    </h3>
                    <div className="opacity-10 mr-4">{icon}</div>
                </div>
            </div>
            <div className=" pt-0 flex-col items-start gap-1 text-sm flex">
                {/* <div className="line-clamp-1 flex gap-2 font-medium">
                +12.5% up this week <TrendingUpIcon className="size-4" />
                </div> */}
                {/* <div className="text-muted-foreground line-clamp-1 flex gap-2 text-xs items-center  mt-1">
                    {subtext}
                </div> */}
            </div>
        </div>
    );
}
