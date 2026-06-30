import { Users, Globe, Compass, Box, ClipboardList, Star } from 'lucide-react';
import type { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';


const AdminStats = () => {
   const Tours = useSelector((state: RootState) => state.tourPackage.tourPackages)

  const statsData = [
    {
      id: 1,
      title: 'Total Users',
      value: '2',
      icon: <Users className="w-5 h-5 text-blue-600" />,
      iconBg: 'bg-blue-50',
      bottomLine: null
    },
    {
      id: 2,
      title: 'Countries',
      value: '250',
      icon: <Globe className="w-5 h-5 text-emerald-600" />,
      iconBg: 'bg-emerald-50',
      bottomLine: null 
    },
    {
      id: 3,
      title: 'Destinations',
      value: '12',
      icon: <Compass className="w-5 h-5 text-amber-700" />,
      iconBg: 'bg-amber-50',
      bottomLine: null
    },
    {
      id: 4,
      title: 'Tour Packages',
      value: Tours.length,
      icon: <Box className="w-5 h-5 text-indigo-600" />,
      iconBg: 'bg-indigo-50',
      bottomLine: null 
    },
    {
      id: 5,
      title: 'Gallery Pendings',
      value: '0',
      icon: <ClipboardList className="w-5 h-5 text-amber-800" />,
      iconBg: 'bg-amber-100/50',
      isSpecialCard: true, 
      bottomLine: null
    },
    {
      id: 6,
      title: 'Active Offers',
      value: Tours.length,
      icon: <Star className="w-5 h-5 text-emerald-600 animate-pulse" />,
      iconBg: 'bg-emerald-50',
      bottomLine: null 
    },
  ];

  return (
    <div className="w-full overflow-x-auto py-4 bg-blue-100/50 p-3 rounded-xl">
      
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 min-w-250 px-2">
        {statsData.map((stat) => (
          <div
            key={stat.id}
            className={`relative flex flex-col justify-between p-5 rounded-2xl border min-h-40 shadow-sm transition-all duration-200 hover:shadow-md bg-white border-gray-100
              `}
          >
            <div className="flex justify-between items-start">
              <div className={`p-2.5 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
                {stat.icon}
              </div>
              
              {/* {stat.isSpecialCard && (
                <span className="w-2 h-2 rounded-full bg-amber-800 mt-1 mr-1" />
              )} */}
            </div>

            <div className="mt-4 grow flex flex-col justify-end">
              <span className="text-sm font-medium text-gray-500 block mb-1">
                {stat.title}
              </span>
              <span className="text-3xl font-bold text-slate-800 tracking-tight">
                {stat.value}
              </span>
            </div>

            {/* <div className="mt-4 h-2 flex items-center">
              {stat.bottomLine}
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminStats;