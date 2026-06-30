import { TriangleAlert } from "lucide-react";


const CARDS =[
    {
        id: 1,
        name:"Gallery Requests",
        color:"bg-red-700",
        count: 8

    },
    {
        id: 2,
        name:"Expiring Offers",
        color:"bg-yellow-600",
        count: 3

    },
    {
        id: 3,
        name:"Draft Packages",
        color:"bg-blue-600",
        count: 2

    }
]

const AdminNotifications = () => {
  return (
    <div className="w-full flex justify-center items-center gap-4 py-7 ">
      <div className="w-[80%] bg-red-100 k p-5 rounded-4xl flex justify-between">
            <div className="flex items-center gap-4">
                <TriangleAlert color="red" size={20}/>
                <p className="text-md font-semibold text-red-600">Attention Required:</p>
                <div className="flex flex-row items-center gap-3  ">
                    {
                        CARDS.map((item)=>(
                            <button key={item.id} className={` p-1 rounded-2xl px-2 flex gap-1 font-bold cursor-pointer text-white ${item.color}`} >
                                    <span className="text-xs">{item.count}</span>
                                    <span className="text-xs">{item.name}</span>
                            </button>
                        ))
                    }

                </div>

            </div>
            <div>
                <button className="text-blue-600 text-sm cursor-pointer">
                    View all Tasks
                </button>

            </div>
      </div>
    </div>
  );
};

export default AdminNotifications;