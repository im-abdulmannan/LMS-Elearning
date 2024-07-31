'use client'
import Loader from '@/app/components/Loader/Loader';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import CourseContent from "../../components/Course/CourseContent";

type Props = {
    params: any;
}

const Page = ({params}: Props) => {
    const id = params.id;
    console.log;
    const {isLoading, error, data} = useLoadUserQuery(undefined, {});

    useEffect(() => {
        if(!data) {
            redirect("/");
        }
      if(data) {
        const isPurchased = data.user.courses.find((item: any) => item._id === id);
        if(!isPurchased) {
            redirect("/");
        }
        if(error) {
            redirect("/")
        }
      }
    }, [data, error, id])
    
  return (
    <>
        {
            isLoading ? <Loader /> : (
                <div>
                    <CourseContent id={id} />
                </div>
            )
        }
    </>
  )
}

export default Page