'use client';

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import styles from './Analytics.module.css';

interface DailyChartProps {
    data: { date: string; value: number }[];
    color?: string;
    title: string;
}

export default function DailyChart({ data, color = '#ff8c00', title }: DailyChartProps) {
    if (!data || data.length === 0) {
        return (
            <div className={styles.chartContainer}>
                <h3>{title}</h3>
                <div className={styles.empty}>No data available</div>
            </div>
        );
    }

    return (
        <div className={styles.chartContainer}>
            <h3>{title}</h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id={`color${title}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                            itemStyle={{ color: 'var(--text-primary)' }}
                        />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                        <Area type="monotone" dataKey="value" stroke={color} fillOpacity={1} fill={`url(#color${title})`} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
