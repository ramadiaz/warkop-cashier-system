"use client";

import Header from "@/components/Utilities/Header";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { GetUserData } from "@/utilities/GetUserData";
import fetchWithAuth from "@/utilities/fetchWithAuth";
import Image from "next/image";

const Page = () => {
  const user_data = GetUserData();
  
  const fetchProfile = async() => {
    try {
        const res = await fetchWithAuth(`/api/user/profile?id=${user_data.id}`)

    } catch(err) {
        console.error(err)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return (
    <>
      <Header title={`Settings`} />
      <div className="w-full h-[calc(100vh_-61px)] flex justify-center items-center">
        <div className="min-w-72">
          <div className="w-full flex flex-row gap-4">
            <div>
              <input
                type="text"
                className="text-sm p-2 rounded-2xl outline-none tracking-widest w-1/2"
                name="fullname"
                placeholder="First Name"
                value={user_data.username}
                disabled
              />
            </div>
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                alt="Photo by Drew Beamer"
                fill
                className="h-full w-full rounded-md object-cover"
              />
            </AspectRatio>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
