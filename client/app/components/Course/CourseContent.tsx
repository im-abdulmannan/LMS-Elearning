import Headings from "@/app/utils/Heading";
import { useGetCourseContentQuery } from "@/redux/features/courses/coursesApi";
import { useState } from "react";
import Loader from "../Loader/Loader";
import CourseContentMedia from "./CourseContentMedia";

type Props = {
    id:string;
    user?: any;
}

const CourseContent = ({id, user}: Props) => {
    const {data:contentData, isLoading, refetch} = useGetCourseContentQuery(id);
    const data = contentData?.content;
    const [activeVideo, setActiveVideo] = useState(0);

  return (
    <>
        {
            isLoading ? <Loader /> : (
                <>
                     {/* <Header activeItem={1} open={open} setOpen={setOpen} route={route} setRoute={setRoute} /> */}
          <div className="w-full grid 800px:grid-cols-10">
            <Headings
              title={data[activeVideo]?.title}
              description="anything"
              keywords={data[activeVideo]?.tags}
            />
             <div className="col-span-7">
              <CourseContentMedia
                data={data}
                id={id}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                user={user}
                refetch={refetch}
              />
            </div>
            </div>
                </>
            )
        }
    </>
  )
}

export default CourseContent