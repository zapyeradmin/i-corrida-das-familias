
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  borderColor: string;
  valueClassName?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
  borderColor,
  valueClassName
}) => {
  return (
    <Card className={`overflow-hidden border-t-4 ${borderColor} shadow-md hover:shadow-lg transition-shadow`}>
      <CardHeader className="pb-2 bg-gradient-to-br from-gray-50 to-gray-100">
        <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className={`text-3xl font-bold ${valueClassName || 'text-gray-800'}`}>{value}</div>
        <p className="text-sm text-gray-500 mt-2">{description}</p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
