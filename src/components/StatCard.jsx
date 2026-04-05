import React from 'react';

const StatCard = ({ title, icon, value, subtitle, badge, badgeColor = 'blue', onClick }) => {
    const badgeColors = {
        red: 'text-red-400 bg-red-50',
        blue: 'text-blue-400 bg-blue-50',
        green: 'text-green-400 bg-green-50',
        orange: 'text-accent-400 bg-accent-50'
    };

    const iconColors = {
        red: 'bg-red-50 text-red-500',
        blue: 'bg-blue-50 text-blue-500',
        green: 'bg-green-50 text-green-500',
        orange: 'bg-accent-50 text-accent-500'
    };

    if (onClick) {
        return (
            <div
                onClick={onClick}
                className="bg-accent-500 p-6 rounded-2xl shadow-xl text-white flex flex-col justify-between relative overflow-hidden group cursor-pointer"
            >
                <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-white/20 transition"></div>
                <h3 className="font-bold text-lg mb-2 relative z-10">{title}</h3>
                <p className="text-accent-100 text-xs mb-4 relative z-10">{subtitle}</p>
                <div className="flex items-center gap-2 font-bold text-sm relative z-10">
                    {value}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-accent-200 transition">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 ${iconColors[badgeColor]} rounded-xl`}>
                    {icon}
                </div>
                {badge && (
                    <span className={`text-xs font-bold ${badgeColors[badgeColor]} px-2 py-1 rounded-lg`}>
                        {badge}
                    </span>
                )}
            </div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">{title}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
            {subtitle && <p className="text-xs text-slate-400 mt-2">{subtitle}</p>}
        </div>
    );
};

export default StatCard;
