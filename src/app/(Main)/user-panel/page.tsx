import Box from "@/src/components/ui/Box";
import CounterBox from "@/src/components/ui/CounterBox";
import SubTitle from "@/src/components/ui/SubTitle";
import UserCourse from "@/src/components/ui/UserCourse";
import { courses, userCounterData } from "@/src/lib/placeholder-data";

export default function UserPanel() {
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {userCounterData.map((box) => (
                    <CounterBox key={box.id} {...box}></CounterBox>
                ))}
            </div>
            <div>
                <SubTitle title="دوره های در حال یادگیری"></SubTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                    {courses.length
                        ? courses.map((order) => (
                              <UserCourse
                                  key={order.id}
                                  {...order}
                              ></UserCourse>
                          ))
                        : ""}
                </div>
            </div>
        </div>
    );
}
