import Photo from "@/app/_components/photo";
import Section from "@/app/_components/section";
import { getDayName, getMonthName } from "@/lib/date";
import { getPhotos } from "@/server/actions/photos";
import Image from "next/image";
import React from "react";

function formatDate(timestamp: Date) {
  return (
    getDayName(timestamp.getDay()) +
    ", " +
    getMonthName(timestamp.getMonth(), "short") +
    " " +
    timestamp.getDate()
  );
}

const PhotosPage = async () => {
  const photos = await getPhotos();

  return (
    <div className="w-full space-y-4 p-4">
      <h1 className="text-6xl font-bold">Photos</h1>
      <div className="flex flex-col gap-4">
        {photos?.map((photo, idx) => {
          return (
            <div key={idx}>
              <h2 className="my-8 text-5xl font-semibold">{photo.year}</h2>
              <div className="flex-col gap-4">
                {photo.data.map((month, idx2) => {
                  return (
                    <div key={idx2}>
                      <h3 className="my-6 text-4xl font-semibold text-neutral-200">
                        {getMonthName(Number(month.month) - 1, "long")}
                      </h3>
                      <div className="flex flex-row flex-wrap gap-4">
                        {month.data.map((day, idx3) => {
                          return (
                            <div key={idx3}>
                              <h4 className="my-4 text-xl font-medium text-neutral-300">
                                {formatDate(
                                  new Date(
                                    `${photo.year}-${month.month}-${day.day}`,
                                  ),
                                )}
                              </h4>
                              <div className="flex flex-row flex-wrap gap-4">
                                {day.data.map((image, idx4) => {
                                  return <Photo photo={image} key={idx4} />;
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PhotosPage;
