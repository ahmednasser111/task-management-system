"use client";
import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useTasks } from "@/context/taskContext";

export const description = "A radial chart with stacked sections";

const chartConfig = {
	desktop: {
		label: "Completed",
		color: "#8BCE89",
	},
	mobile: {
		label: "Pending",
		color: "#EB4E31",
	},
} satisfies ChartConfig;

function RadialCHart() {
	const { tasks, completedTasks, activeTasks } = useTasks();
	const tasksTotal = tasks.length;

	const chartData = [
		{
			pending: activeTasks.length,
			completed: completedTasks.length,
		},
	];

	return (
		<Card className='flex flex-col border-2 border-white dark:border-gray-700 shadow-none bg-[#EDEDED] dark:bg-gray-800'>
			<CardHeader className='items-center pb-0'>
				<CardTitle className='dark:text-white'>
					Comleted vs Pending Tasks
				</CardTitle>
				<CardDescription className='dark:text-gray-400'>
					Task completion status.
				</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-1 items-center pb-0'>
				<ChartContainer
					config={chartConfig}
					className='mx-auto aspect-square w-full max-w-[250px]'>
					<RadialBarChart
						data={chartData}
						endAngle={180}
						innerRadius={80}
						outerRadius={130}>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<PolarRadiusAxis
							tick={false}
							tickLine={false}
							axisLine={false}>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor='middle'>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) - 16}
													className='fill-foreground dark:fill-white text-2xl font-bold'>
													{tasksTotal}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 4}
													className='fill-muted-foreground dark:fill-gray-400'>
													Tasks
												</tspan>
											</text>
										);
									}
								}}
							/>
						</PolarRadiusAxis>
						<RadialBar
							dataKey='completed'
							stackId='a'
							cornerRadius={5}
							fill='var(--color-desktop)'
							className='stroke-transparent stroke-2'
						/>
						<RadialBar
							dataKey='pending'
							fill='var(--color-mobile)'
							stackId='a'
							cornerRadius={5}
							className='stroke-transparent stroke-2'
						/>
					</RadialBarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}

export default RadialCHart;
