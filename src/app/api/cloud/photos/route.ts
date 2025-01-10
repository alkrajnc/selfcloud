import { calculateCacheHash, verifyToken } from "@/lib/crypto";
import { getPhotos } from "@/server/actions/photos";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { Image } from "@/server/db/schema";
import { NextRequest, NextResponse } from "next/server";

const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce(
    (groups, item) => {
      (groups[key(item)] ||= []).push(item);
      return groups;
    },
    {} as Record<K, T[]>,
  );

export async function GET(req: NextRequest) {
  const session = await getServerAuthSession();

  const token: string = req.headers.get("X-Auth-Token") as string;
  const searchParams = req.nextUrl.searchParams;
  const year = searchParams.get("year");

  const verification = await verifyToken(token);
  if (verification.payload || session?.user) {
    const photos = await db.query.images.findMany({
      orderBy: (photos, { desc }) => [desc(photos.timestamp)],
      where: (images, { eq }) =>
        eq(
          images.ownerId,
          verification.payload
            ? verification.payload.user.id!
            : session?.user.id!,
        ),
    });

    type GroupedDay = {
      day: string;
      data: Image[];
    };

    type GroupedMonth = {
      month: string;
      data: GroupedDay[];
    };

    interface Grouped {
      year: string;
      data: GroupedMonth[];
    }

    let groupedPhotos: Grouped[] = [];

    const groupedByYear = groupBy(photos, (p) =>
      new Date(p.timestamp).getFullYear(),
    );

    Object.values(groupedByYear).forEach((year, idx) => {
      const groupedMonths = groupBy(year, (p) =>
        new Date(p.timestamp).getMonth(),
      );

      const monthData: GroupedMonth[] = [];

      Object.values(groupedMonths).forEach((month, id) => {
        const dayData: GroupedDay[] = [];
        const groupedByDay = groupBy(month, (p) =>
          new Date(p.timestamp).getDate(),
        );

        Object.values(groupedByDay).forEach((day, id2) => {
          dayData.push({ day: Object.keys(groupedByDay)[id2]!, data: day });
        });

        dayData.sort((a, b) => Number(b.day) - Number(a.day));

        monthData.push({
          month: Object.keys(groupedMonths)[id]!,
          data: dayData,
        });
      });

      monthData.sort((a, b) => Number(b.month) - Number(a.month));

      groupedPhotos.push({
        year: Object.keys(groupedByYear)[idx]!,
        data: monthData,
      });

      groupedPhotos.sort((a, b) => Number(b.year) - Number(a.year));
    });

    return NextResponse.json(
      {
        photos: year
          ? [groupedPhotos[new Date().getFullYear() - Number(year)]]
          : groupedPhotos,
        hash: calculateCacheHash(
          year
            ? groupedPhotos.toString()
            : [
                groupedPhotos[new Date().getFullYear() - Number(year)],
              ].toString(),
        ),
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
        },
      },
    );
  }
  return NextResponse.json("unauthorized", { status: 403 });
}
