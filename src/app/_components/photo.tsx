import { getDayName, getMonthName } from "@/lib/date";
import { Image as ImageT } from "@/server/db/schema";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PhotoProps {
  photo: ImageT;
}

function calculateAspectRatio(width: number, height: number) {
  return width / height;
}

function calculateSize(width: number, height: number) {
  const targetHeight = 250;
  const aspectRatio = calculateAspectRatio(width, height);

  return {
    width: Math.round(targetHeight * aspectRatio),
    height: targetHeight,
  };
}

const Photo = ({ photo }: PhotoProps) => {
  return (
    <div className="w-max shadow-white hover:drop-shadow-xl">
      <Link href={"/"}>
        <Image
          src={`/api/cloud/photos?id=${photo.id}`}
          className="rounded-sm transition"
          placeholder={photo.blurhash ? "blur" : "empty"}
          style={{
            aspectRatio: calculateAspectRatio(
              photo.dimensionX,
              photo.dimensionY,
            ),
          }}
          blurDataURL={photo.blurhash ?? ""}
          alt="Picture"
          height={calculateSize(photo.dimensionX, photo.dimensionY).height}
          width={calculateSize(photo.dimensionX, photo.dimensionY).width}
        />
      </Link>
    </div>
  );
};

export default Photo;
