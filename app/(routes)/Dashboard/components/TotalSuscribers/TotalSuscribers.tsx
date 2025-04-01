"use client"
import { CustomIcon } from "@/components/CustomIcon";
import { Percent } from "lucide-react";
import {Pie,PieChart ,ResponsiveContainer,Tooltip, Legend  } from 'recharts';
import { dataTotalSuscribers } from "./TotalSuscribers.data";




export  function TotalSuscribers() {
  return (
    <div className="w-full p-5 mb-4 transition rounded-lg shadow-sm lg:mb-0 bg-background xl:w-96 hover:shadow-lg">
        <div className="flex items-center mb-4 gap-x-2">
            <CustomIcon icon={Percent}/>
            <p className="text-xl">Total Compras</p>
        </div>
        <div className="w-full h-[200px] p-5">
            <ResponsiveContainer width="100%" aspect={4/3}>
                <PieChart width={300} height={200}>
                    <Pie dataKey="value" data={dataTotalSuscribers} outerRadius={80} labelLine={false} />
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    </div>
  )
}
